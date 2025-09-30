import React from 'react';
import PokemonArray from '../Pokemon/PokemonArray';
import TeamCardArray from '../Teams/TeamCardArray';
import Nav from '../Pokemon/Nav';
import { get_liked_pokemon_from_session_storage ,get_specific_user_teams, get_specific_user_likes } from '../scripts/REST_api_calls.js'; 
import { useParams } from "react-router-dom";

function UserPage( {pokedex} ) {
    const [pokemonLikedByUser, setPokemonLikedByUser] = React.useState(null);
    const { userID } = useParams();

    if(!isNaN(parseInt(userID)))    window.history.go(-1);
    const [likedPokemon, setLikedPokemon] = React.useState(null);

    if(pokemonLikedByUser == null){
        setPokemonLikedByUser(get_liked_pokemon_from_session_storage());
    }

    React.useEffect(() => {
        async function temp(){
            if(!likedPokemon)   setLikedPokemon(await get_specific_user_likes(userID));
        };
        temp();
    }, []);
    
    console.log(likedPokemon);

    if(likedPokemon == -1) {
        window.location.replace('/#/');
        window.location.reload();
    }

    const teamsArr = (<TeamCardArray viewOnly={true} propsUsername={userID} pokedex={pokedex} />); 

    let editProfileRedirect = (<></>);
    let storageUsername;
    
    try {
        storageUsername = JSON.parse(sessionStorage.username);
    } catch (error) {
        console.log("no username in storage");
    }

    if(userID == storageUsername) {
        editProfileRedirect = (
            <button className={"hover:text-blue-100"} onClick={(e) => {window.location.replace('/#/edit_profile')}}>Edit Profile </button>
        );
    }

    let pokemonArr = (<h2> getting pokemon array </h2>);
    if(likedPokemon) {
        pokemonArr = (
            <PokemonArray pokedex={pokedex} idArray={likedPokemon.map(entry => entry.pokemon_id)} 
                          pokemonLikedByUser={pokemonLikedByUser} 
                          pokemonPerPage={20} setPokemonLikedByUser={setPokemonLikedByUser} />);
    }
    
    return(<>
        <Nav resource={'user'} defaultValue = {userID} />
        <div className={"flex flex-col items-center gap-4"}>
            <h1 className={"font-semibold text-3xl mt-3"}> {userID} </h1>
            {editProfileRedirect}
            <h2 className={"text-2xl font-medium"}> Teams: </h2>
            {teamsArr} 
            <h2 className={"text-2xl font-medium"}> Liked Pokemon: </h2>
            {pokemonArr}
        </div>
    </>);

}

export default UserPage;
