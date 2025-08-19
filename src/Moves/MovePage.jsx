import React from 'react';
import PokemonCard from '../Pokemon/PokemonCard.jsx';
import PokemonArray from '../Pokemon/PokemonArray.jsx';

function MovePage({ pokedex, id }) {

    const [moveData, setMoveData] = React.useState(null);

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
     } pokedex={pokedex} pokemonPerPage={3}/>


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