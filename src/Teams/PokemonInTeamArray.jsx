import React from 'react';
import { add_pokemon_to_team ,remove_pokemon_from_team } from '../scripts/REST_api_calls.js';

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
    
    const [imgSrc, setImgSrc] = React.useState(null);
    const [pokemonName, setPokemonName] = React.useState(null);

    React.useEffect(() => {
        async function getImage(){
            try {
                const response = await pokedex.getPokemonByName(pokemonID);
                setImgSrc(response.sprites.front_default);
                setPokemonName(response.name);
                console.log("fetched data"); 
            } catch (error) {
                console.log("ERROR: ", error);
            }
        };
        if (imgSrc == null) getImage();
    }, [pokemonID]);
    

    if(!imgSrc) {
        return (<p> getting image for pokemon {pokemonID} </p>);
    }

    return(
    <li key={pokemonID}>
        <img className="pokemon-image" src={imgSrc}></img>  
        <h3 className="on-black">{pokemonName}</h3> 
        {!viewOnly ? <button onClick={() => {remove_pokemon_from_team(teamID, pokemonID, setPokemonIDS)}}> Remove From Team </button> : <></>}
    </li>);
}


function PokemonInTeamArray( { viewOnly, teamID, pokemonIDS, setPokemonIDS, pokedex } ){
    if(!pokemonIDS) return (<p> Getting pokemon in team... </p>);
    const documentElementList = pokemonIDS.map((entry) => <PokemonInTeamElement viewOnly={viewOnly} pokedex={pokedex} teamID={teamID} pokemonID={entry.pokemon_id} setPokemonIDS = {setPokemonIDS} />)
   

    let addPokemon;
    if (pokemonIDS.length < 6 && !viewOnly) {
        addPokemon = (<li key={0}> <AddPokemonToTeam viewOnly={viewOnly} teamID={teamID} setPokemonIDS={setPokemonIDS} /> </li>);
    }

    return(<div> <ul> {documentElementList} {addPokemon} </ul> </div>);
}

export default PokemonInTeamArray;
