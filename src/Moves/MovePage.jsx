import React from 'react';
import PokemonCard from '../Pokemon/PokemonCard.jsx';
import PokemonArray from '../Pokemon/PokemonArray.jsx';
import {get_liked_pokemon_from_session_storage} from '../scripts/REST_api_calls.js';

function MovePage({ pokedex, id }) {

    const [moveData, setMoveData] = React.useState(null);
    const [pokemonLikedByUser, setPokemonLikedByUser] = React.useState(null);

    if(!pokemonLikedByUser) {
        setPokemonLikedByUser(get_liked_pokemon_from_session_storage());
    }


        React.useEffect(() => {
            async function getMoveData() {
                if (moveData == null) {
                const response = await pokedex.getMoveByName(id);
                console.log("fetched data");
                setMoveData(response);
                }
            }
            getMoveData();
        }, [pokedex, moveData, id]);

    if (!moveData) {
        return (<div>Loading move...</div>);
    }

    //const pokemonList = moveData.learned_by_pokemon.map(pokemon => <PokemonCard id={pokemon.name} pokedex={pokedex} />)

    const pokemonList = <PokemonArray idArray={
        moveData.learned_by_pokemon.map(pokemon => pokemon.name)
     } pokedex={pokedex} pokemonPerPage={3} pokemonLikedByUser={pokemonLikedByUser} setPokemonLikedByUser={setPokemonLikedByUser}/>


    const effectEntry = moveData.effect_entries.find(
        entry => entry.language.name === "en"
    );


    return(
        <div className='move-page on-black'>
            <h1 className="title">{moveData.name}</h1>
            <p>{effectEntry.effect}</p>
            <h2>Pokemon with this move:</h2>
            <div className="pokemon-array">
                {pokemonList}
            </div>
        </div>
    )
}




export default MovePage;
