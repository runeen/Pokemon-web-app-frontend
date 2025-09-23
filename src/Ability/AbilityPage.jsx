import React from 'react';
import PokemonArray from '../Pokemon/PokemonArray.jsx';
import {get_liked_pokemon_from_session_storage} from '../scripts/REST_api_calls.js';

function AbilityPage({ pokedex, id }) {

    const [abilityData, setAbilityData] = React.useState(null);
    const [likedPokemon, setLikedPokemon] = React.useState(null);

    if(!likedPokemon) {
        setLikedPokemon(get_liked_pokemon_from_session_storage());
    }


    React.useEffect(() => {
        async function getAbilityData() {
            if (abilityData == null) {
                const response = await pokedex.getAbilityByName(id);
                console.log("fetched data");
                setAbilityData(response);
            }
        }
        getAbilityData();
    }, [pokedex, abilityData, id]);

    if (!abilityData) {
        return (<div>Loading ability...</div>);
    }

    const pokemonList = <PokemonArray idArray={
        abilityData.pokemon.map(pokemon => pokemon.pokemon.name)
     } pokedex={pokedex} pokemonPerPage={20} pokemonLikedByUser={likedPokemon} setPokemonLikedByUser={setLikedPokemon}/>

    const effectEntry = abilityData.effect_entries.find(
        entry => entry.language.name == "en"
    );

    return(
        <div className='flex flex-col text-center items-center gap-6 mt-4'>
            <h1 className="text-2xl font-semibold capitalize">{abilityData.name}</h1>
            <p className="text-justify text-md mx-6">{effectEntry.effect}</p>
            <h2 className="text-xl">Pokemon with this ability:</h2>
            <div className="">
                {pokemonList}
            </div>
        </div>
    )
}




export default AbilityPage;
