import React from 'react';
import { add_pokemon_to_team ,remove_pokemon_from_team } from '../scripts/REST_api_calls.js';
import { BORDER_COLOR_TYPES, SHADOW_COLOR_TYPES } from '../Pokemon/colorConstants.js';
function AddPokemonToTeam( { teamID, setPokemonIDS } ) {
    const [pokemonToAdd, setPokemonToAdd] = React.useState('');
    

    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault(); add_pokemon_to_team(teamID, pokemonToAdd, setPokemonIDS);}}>
                <input size={"9"} value={pokemonToAdd} name="pokemonID" placeholder="Pokemon ID" onChange={e => setPokemonToAdd(e.target.value)} />
                <button type="submit">Add Pokemon </button>
            </form>
        </div>
    );
}

function PokemonInTeamElement( {viewOnly, teamID ,pokemonID, setPokemonIDS, pokedex } ) {
    
    const [pokemonData, setPokemonData] = React.useState(null);

    React.useEffect(() => {
        async function getImage(){
            try {
                const response = await pokedex.getPokemonByName(pokemonID);
                setPokemonData(response);
                console.log("fetched data"); 
            } catch (error) {
                console.log("ERROR: ", error);
            }
        };
        if (pokemonData == null) getImage();
    }, [pokemonID]);

    let borderColor = 'border-gray-400';
    let shadowColor = 'shadow-white';

    if(pokemonData) {
        borderColor = BORDER_COLOR_TYPES[pokemonData.types[0].type.name];
        shadowColor = SHADOW_COLOR_TYPES[pokemonData.types[0].type.name];
    }


    if(!pokemonData) {
        return (<p> getting image for pokemon {pokemonID} </p>);
    }

    return(
    <li className={`border-2 ${borderColor} shadow-md ${shadowColor} flex-none rounded-md w-30 h-40 flex flex-col align-middle text-center`} >
        <a className={"flex flex-col items-center"} href={`/pokemon/${pokemonID}`}>
            <img className={`bg-gray-700 shadow-lg rounded-md size-20 my-5 mx-3`} src={pokemonData.sprites.front_default}></img>  
            <p className="">{pokemonData.name}</p> 
        </a>
        {!viewOnly ? <button onClick={() => {remove_pokemon_from_team(teamID, pokemonID, setPokemonIDS)}}> Remove From Team </button> : <></>}
    </li>);
}


function PokemonInTeamArray( { viewOnly, teamID, pokemonIDS, setPokemonIDS, pokedex } ){
    if(!pokemonIDS) return (<p> Getting pokemon in team... </p>);
    console.log(pokemonIDS)
    const documentElementList = pokemonIDS.map((entry) => <PokemonInTeamElement key={entry.pokemon_id + ' ' + teamID} viewOnly={viewOnly} pokedex={pokedex} teamID={teamID} pokemonID={entry.pokemon_id} setPokemonIDS = {setPokemonIDS} />)
   

    let addPokemon;
    if (pokemonIDS.length < 6 && !viewOnly) {
        addPokemon = (<li key={0}> <AddPokemonToTeam viewOnly={viewOnly} teamID={teamID} setPokemonIDS={setPokemonIDS} /> </li>);
    }

    return(<div> <ul className={`flex flex-row justify-center-safe overflow-scroll m-2 gap-2`}> {documentElementList} {addPokemon} </ul> </div>);
}

export default PokemonInTeamArray;
