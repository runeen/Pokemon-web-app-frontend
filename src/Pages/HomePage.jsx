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

    const editProfile = (<><button onClick={() => {window.location.replace('/edit_profile');}}>Edit Your Profile</button></>);
    if(!randomPokemonIDS) {
        let tempPokemonIDS = [];
        for(let i = 0; i < 48; i++) {
            tempPokemonIDS.push(Math.floor(Math.random() * 1024) + 1);
        }
        setRandomPokemonIDS(tempPokemonIDS);
    }
    
    let userProfilesList = (<></>);
    if(userIDS && userIDS != -1) {
        console.log(userIDS);
        userProfilesList = (
            <ul>
                {userIDS.map((entry => 
                <li key={entry.id}>
                    <LinkToResourcePage resource="user" id={entry.username} name={entry.username} className={"users"} />
                </li>))}
            </ul>
        );
    }

    return (
        <>
            <Nav resource="user" defaultValue={""} />
            <h1 className={"title on-black"}>POKEMON REACT</h1>
            <h2 className={"title on-black"}>Random Pokemon: </h2>
            <PokemonArray pokedex={pokedex} idArray={randomPokemonIDS} pokemonLikedByUser={pokemonLikedByUser}
                          setPokemonLikedByUser={setPokemonLikedByUser} pokemonPerPage={3}/>
            <h2 className={"title on-black"}>Users: </h2>
            {userProfilesList}
            {loggedIn && editProfile}
        </>
    );
}

export default HomePage;

