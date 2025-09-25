import React from 'react';
import { add_pokemon_to_team ,remove_pokemon_from_team } from '../scripts/REST_api_calls.js';
import { BORDER_COLOR_TYPES, SHADOW_COLOR_TYPES } from '../Pokemon/colorConstants.js';
function AddPokemonToTeam( { teamID, setPokemonIDS } ) {
    const [pokemonToAdd, setPokemonToAdd] = React.useState('');
    

    return (
        <div className="flex flex-col mx-3 h-40 justify-center">
            <form className={"flex flex-col gap-2"} onSubmit={(e) => {e.preventDefault(); add_pokemon_to_team(teamID, pokemonToAdd, setPokemonIDS);}}>
                <input className={"bg-zinc-900"} size={"9"} value={pokemonToAdd} name="pokemonID" placeholder="Pokemon ID" onChange={e => setPokemonToAdd(e.target.value)} />
                <button className={"hover:text-blue-100"} type="submit">Add Pokemon </button>
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
    <li className={`border-2 ${borderColor} shadow-md ${shadowColor} flex-none rounded-md w-30 h-45 flex flex-col align-middle text-center`} >
        <a className={"flex flex-col items-center"} href={`/#/pokemon/${pokemonID}`}>
            <p className="capitalize my-2">{pokemonData.name}</p> 
            <img className={`bg-gray-700 shadow-lg rounded-md size-20 my-2 mx-3`} src={pokemonData.sprites.front_default}></img>  
        </a>
        {!viewOnly ? <button className={"hover:text-red-200 my-2"} onClick={() => {remove_pokemon_from_team(teamID, pokemonID, setPokemonIDS)}}> Remove </button> : <></>}
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

    return(<div className={"mx-2 my-5"}> <ul className={`flex flex-row justify-center-safe overflow-scroll m-2 gap-2`}> {documentElementList} {addPokemon} </ul> </div>);
}

export default PokemonInTeamArray;
