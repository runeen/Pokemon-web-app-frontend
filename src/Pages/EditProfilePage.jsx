import React from 'react';
import { get_liked_pokemon_from_session_storage } from '../scripts/REST_api_calls.js';
import Nav from '../Pokemon/Nav';
import TeamCardArray from '../Teams/TeamCardArray';
import PokemonArray from '../Pokemon/PokemonArray';

function EditProfilePage( { pokedex } ) {
    const [apiResponse, setApiResponse] = React.useState(null);
    const [pokemonLikedByUser, setPokemonLikedByUser] = React.useState(null);

    if(pokemonLikedByUser == null) {
        setPokemonLikedByUser(get_liked_pokemon_from_session_storage());
    }
    
    let userPokemonArray;
    if (pokemonLikedByUser) {
        userPokemonArray = (
            <PokemonArray pokedex = {pokedex} idArray={pokemonLikedByUser} pokemonLikedByUser={pokemonLikedByUser}
                          setPokemonLikedByUser={setPokemonLikedByUser} pokemonPerPage={3} />
    );}

    let username;
    try { 
        username = JSON.parse(sessionStorage.username);
    } catch (error) { 
    }
    
    return (
        <div>
            <Nav resource={"pokemon"} defaultValue={1} />
            <h1 className={'on-black'}>You are now editing your profile </h1>

            <h2 className={'on-black'}>Teams: </h2>
            <TeamCardArray viewOnly={false} pokedex={pokedex} />

            <h2 className={'on-black'}>Liked Pokemon: </h2>
            {userPokemonArray}
        </div>
    );
}

export default EditProfilePage;
