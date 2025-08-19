import React from 'react';
import PokemonArray from '../Pokemon/PokemonArray.jsx';
import PokemonCard from '../Pokemon/PokemonCard.jsx';

function AbilityPage({ pokedex, id }) {

    const [abilityData, setAbilityData] = React.useState(null);

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

    //const pokemonList = abilityData.pokemon.map(pokemon => <PokemonCard id={pokemon.pokemon.name} pokedex={pokedex} />)

    const pokemonList = <PokemonArray idArray={
        abilityData.pokemon.map(pokemon => pokemon.pokemon.name)
     } pokedex={pokedex} pokemonPerPage={3}/>

    const effectEntry = abilityData.effect_entries.find(
        entry => entry.language.name == "en"
    );


    return(
        <div className='ability-page'>
            <h1 className="title">{abilityData.name}</h1>
            <p>{effectEntry.effect}</p>
            <h2>Pokemon with this ability:</h2>
            <div className="pokemon-array">
                {pokemonList}
            </div>
        </div>
    )
}




export default AbilityPage;