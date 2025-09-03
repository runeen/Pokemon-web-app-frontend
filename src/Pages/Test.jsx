import React from 'react';
import PokemonArray from '../Pokemon/PokemonArray';
import Nav from '../Pokemon/Nav';
import { get_liked_pokemon_from_session_storage } from '../scripts/REST_api_calls';
import TeamCard from '../Teams/TeamCard';
import CreateTeam from '../Teams/CreateTeam';
function Test( { pokedex } ) {

    const [apiResponse, setApiResponse] = React.useState(null);

    const [pokemonLikedByUser, setPokemonLikedByUser] = React.useState(null);

    console.log(pokemonLikedByUser);

    if(pokemonLikedByUser == null){
        setPokemonLikedByUser(get_liked_pokemon_from_session_storage());
    }


    React.useEffect(() => {
        async function getApiData(){
            try {
                const result = await fetch("http://localhost:3000/api/profile/users/liked_pokemon");
                const response = await result.json();
                console.log("fetched api data");
                console.log(response);
                setApiResponse(response);
            }
            catch (error) {
                console.log("ERROR: " ,error);
            }
        }
        if (apiResponse == null) getApiData();
    }, []);



    let userDetailsArea;
    let userPokemonArray;
    if(pokemonLikedByUser) userPokemonArray = <> <h1 className="on-black">YOUR LIKES:</h1> userPokemonArray = <PokemonArray pokedex = {pokedex} idArray={pokemonLikedByUser} pokemonPerPage={3} setLikes = {setPokemonLikedByUser}/> </>
    else userPokemonArray = <></>;

    let username;   //TODO: ar trb sa fie functie separata sa iei username din sessionStorage
    try {
        username = JSON.parse(sessionStorage.username);
    }
    catch {
        username = "";
    }

    if (!apiResponse) userDetailsArea = <h1> fetching user data</h1>
    else              userDetailsArea = apiResponse.data.filter(entry => entry.username != username).map(
            entry => <li key={entry.username}> <h1 className="on-black">{entry.username}</h1>  <PokemonArray  pokedex={pokedex} idArray={entry.liked} pokemonPerPage={3} setLikes = {setPokemonLikedByUser}/> </li>
        );

    return (
        <div>
        <Nav resource={"pokemon"} defaultValue={1} />
        {userPokemonArray}
        {userDetailsArea}
        <CreateTeam />
        <TeamCard team_id={7} pokedex={pokedex} setPokemonLikedByUser={setPokemonLikedByUser}/>
        </div>
    );

}





export default Test;
