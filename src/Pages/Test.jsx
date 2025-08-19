import React from 'react';
import PokemonArray from '../Pokemon/PokemonArray';
import Nav from '../Pokemon/Nav';

function Test( { pokedex } ) {

    const [apiResponse, setApiResponse] = React.useState(null);
    const [serverUrl, _] = React.useState("http://localhost:3000/api/profile/liked_pokemon");

    React.useEffect(() => {
        async function getApiData(){
            try {
                const result = await fetch(serverUrl);
                const response = await result.json();
                console.log("fetched api data");
                console.log(response);
                setApiResponse(response);
            }
            catch (error) {
                console.log("ERROR: " ,error);
            }
        }
        getApiData();
    }, [serverUrl]);


    let userDetailsArea;

    if (!apiResponse) userDetailsArea = <h1> fetching user data</h1>
    else              userDetailsArea = apiResponse.data.map(
            entry => <li key={entry.username}> <h1 className="on-black">{entry.username}</h1>  <PokemonArray  pokedex={pokedex} idArray={entry.liked} pokemonPerPage={3}/> </li>
        );

    return (
        <div>
        <Nav resource={"pokemon"} defaultValue={1} />
        {userDetailsArea}
        </div>
    );

}





export default Test;