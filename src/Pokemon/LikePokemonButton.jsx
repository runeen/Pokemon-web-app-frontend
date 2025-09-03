
import React from 'react';
import { get_token_from_session_storage, like_pokemon, remove_like_pokemon, check_pokemon_liked, get_liked_pokemon_from_session_storage } from '../scripts/REST_api_calls';


function LikePokemonButton( {pokemon_id, setPokemonLikedByUser} ){

    const [liked, setLiked] = React.useState();
    const [loggedIn, setLoggedIn] = React.useState(false);

    if(loggedIn == false){
        if(get_token_from_session_storage()) {
            setLoggedIn(true);
        }
    }


    if(liked == null) {
        setLiked(check_pokemon_liked(pokemon_id));
    }


    if(loggedIn == false) return <></>;

    if(!liked) return (
        <button onClick={() => {like_pokemon(pokemon_id); setLiked(true); setPokemonLikedByUser(get_liked_pokemon_from_session_storage());}}>LIKE POKEMON</button>
    )
    else return (
        <button onClick={() => {remove_like_pokemon(pokemon_id); setLiked(false); setPokemonLikedByUser(get_liked_pokemon_from_session_storage());}}>REMOVE LIKE</button>
    )

};

export default LikePokemonButton;
