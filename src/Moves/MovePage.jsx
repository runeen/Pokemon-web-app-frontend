import React from 'react';
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
                try {
                    if (moveData == null) {
                    const response = await pokedex.getMoveByName(id);
                    console.log("fetched data");
                    setMoveData(response);
                    }
                } catch (error) {
                    console.log("error fetching move");
                    if (error.status == 404)    setMoveData("NOT FOUND");
                }
            }
            getMoveData();
        }, [id]);

    if (moveData == "NOT FOUND") {
        window.location.replace('/#/');
        window.location.reload();
    }

    if (!moveData) {
        return (<div>Loading move...</div>);
    }

    //const pokemonList = moveData.learned_by_pokemon.map(pokemon => <PokemonCard id={pokemon.name} pokedex={pokedex} />)

    const pokemonList = <PokemonArray idArray={
        moveData.learned_by_pokemon.map(pokemon => pokemon.name)
     } pokedex={pokedex} pokemonPerPage={20} pokemonLikedByUser={pokemonLikedByUser} setPokemonLikedByUser={setPokemonLikedByUser}/>


    const effectEntry = moveData.effect_entries.find(
        entry => entry.language.name === "en"
    );


    return(
        <div className='flex flex-col text-center items-center gap-6 mt-4'>
            <h1 className="text-2xl font-semibold capitalize">{moveData.name}</h1>
            <p className="text-justify text-md mx-6">{effectEntry.effect}</p>
            <h2 className="text-xl">Pokemon that can learn this move:</h2>
            <div className="">
                {pokemonList}
            </div>
        </div>
    )
}




export default MovePage;
