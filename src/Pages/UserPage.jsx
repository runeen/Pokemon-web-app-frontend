import React from 'react';
import PokemonArray from '../Pokemon/PokemonArray';
import TeamCardArray from '../Teams/TeamCardArray';
import { get_specific_user_teams, get_specific_user_likes } from '../scripts/REST_api_calls.js'; 
import { useParams } from "react-router-dom";

function UserPage( {pokedex} ) {
    
    const { userID } = useParams();
    const [teams, setTeams] = React.useState(null);
    const [likedPokemon, setLikedPokemon] = React.useState(null);

    React.useEffect(() => {
        async function temp(){
            if(!teams)          setTeams(await get_specific_user_teams(userID));
            if(!likedPokemon)   setLikedPokemon(await get_specific_user_likes(userID));
        };
        temp();
    }, []);

    return(<>
        <h1> USER {userID}: </h1>
        <p> {JSON.stringify(teams)} {JSON.stringify(likedPokemon)} </p>
    </>);

}

export default UserPage;
