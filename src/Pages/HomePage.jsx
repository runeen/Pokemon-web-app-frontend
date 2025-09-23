import React from 'react';
import LinkToResourcePage from '../LinkToResourcePage';
import Nav from '../Pokemon/Nav';
import PokemonArray from '../Pokemon/PokemonArray';
import { get_users, get_liked_pokemon_from_session_storage, get_token_from_session_storage } from '../scripts/REST_api_calls';

function HomePage( { pokedex } ) {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [pokemonLikedByUser, setPokemonLikedByUser] = React.useState(null);
    const [randomPokemonIDS, setRandomPokemonIDS] = React.useState(null);
    const [userIDS, setUserIDS] =  React.useState(null);

    React.useState(() => {
        async function getLoggedIn() {
            setLoggedIn(null != await get_token_from_session_storage());
        }
        if(!loggedIn)   getLoggedIn();

        async function getUserIDS() {
            setUserIDS(await get_users());
        }
        if(!userIDS) getUserIDS()
    }, []);
    
    if(pokemonLikedByUser == null) {
        setPokemonLikedByUser(get_liked_pokemon_from_session_storage());
    }

    const editProfile = (<a className={"w-full text-center my-2 font-semibold hover:text-gray-400"} href='edit_profile'>Edit Your Profile</a>);
    if(!randomPokemonIDS) {
        let tempPokemonIDS = [];
        while(tempPokemonIDS.length < 90) {
            const randomPokemon = Math.floor(Math.random() * 1024) + 1;
            if(!tempPokemonIDS.includes(randomPokemon)) {
                tempPokemonIDS.push(randomPokemon);
            }
            else {

            }
        }
        setRandomPokemonIDS(tempPokemonIDS);
    }
    
    let userProfilesList = (<></>);
    if(userIDS && userIDS != -1) {
        console.log(userIDS);
        userProfilesList = (
            <ul className={"flex flex-wrap items-stretch mx-5"}>
                {userIDS.map((entry => 
                <li key={entry.id}>
                    <LinkToResourcePage resource="user" id={entry.username} name={entry.username} className={"m-2 font-medium hover:text-gray-300"} />
                </li>))}
            </ul>
        );
    }

    return (
        <div>
            <Nav resource="user" defaultValue={""} />
            <div className="max-h-screen max-w-screen">
                <h1 className={"width-full text-center text-3xl font-semibold py-5"}>POKEMON REACT</h1>
                <hr className={""}></hr>
                <div className={"flex flex-wrap sm:flex-nowrap justify-items-center dividy-y sm:felx-col sm:align-around sm:divide-x"}>
                    <div className={"w-full sm:w-80/100 p-5"}>
                        <h2 className={"text-center font-semibold text-xl"}>Random Pokemon: </h2>
                        <PokemonArray pokedex={pokedex} idArray={randomPokemonIDS} pokemonLikedByUser={pokemonLikedByUser}
                                      setPokemonLikedByUser={setPokemonLikedByUser} pokemonPerPage={30}/>
                    </div>
                    <div className={"w-full sm:w-20/100 p-5 flex flex-col items-center"}>
                        <h2 className={"text-center font-semibold text-xl"}>Users: </h2>
                        {userProfilesList}
                        {loggedIn && editProfile}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

