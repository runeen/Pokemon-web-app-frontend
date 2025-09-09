
import React from 'react';
import { get_token_from_session_storage, like_pokemon, remove_like_pokemon, get_liked_pokemon_from_session_storage } from '../scripts/REST_api_calls';

function check_pokemon_liked(pokemon_id, pokemonLikedByUser) {
    return pokemonLikedByUser.includes(pokemon_id);
}

function LikePokemonButton( {pokemon_id, pokemonLikedByUser, setPokemonLikedByUser} ){

    const [liked, setLiked] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);

    if(loggedIn == false){
        if(get_token_from_session_storage()) {
            setLoggedIn(true);
        }
    }
    
    if(check_pokemon_liked(pokemon_id, pokemonLikedByUser) && !liked)   setLiked(true);
    if(!check_pokemon_liked(pokemon_id, pokemonLikedByUser) && liked)   setLiked(false);

    if(loggedIn == false) return <></>;

    if(!liked) return (
        <button onClick={async () => {setPokemonLikedByUser(await like_pokemon(pokemon_id)); setLiked(true);}} > LIKE POKEMON</button>
    )
    else return (
        <button onClick={async () => {setPokemonLikedByUser(await remove_like_pokemon(pokemon_id)); setLiked(false);}}>REMOVE LIKE</button>
    )

};

export default LikePokemonButton;
