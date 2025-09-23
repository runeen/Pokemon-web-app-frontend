import React from 'react';
import AbilityInCard from '../Ability/AbilityInCard.jsx';
import LinkToResourcePage from '../LinkToResourcePage.jsx';
import LikePokemonButton from './LikePokemonButton.jsx';
import {BORDER_COLOR_TYPES, SHADOW_COLOR_TYPES} from './colorConstants.js';

function PokemonCard({ id, pokedex, pokemonLikedByUser, setPokemonLikedByUser }) {
    const [pokemonData, setPokemonData] = React.useState(null);

    React.useEffect(() => {
        async function getPokemonData(){
            try {
                const response = await pokedex.getPokemonByName(id);
                console.log("fetched data");
                setPokemonData(response);
            }
            catch (error) {
                console.log("ERROR: " ,error);
            }
        }
        if(pokemonData == null) getPokemonData();
    }, [id, pokedex]);

    if (!pokemonData) {
        return (<div className="h-md w-3xs m-5"></div>);
    }
    let borderColor = "border-gray-400";
    let shadowColor = "shadow-balack";
    
    //ar trb sa nu fie aici ii gasesc un loc mai tarziu

    if(pokemonData) {
        borderColor = BORDER_COLOR_TYPES[pokemonData.types[0].type.name];
        shadowColor = SHADOW_COLOR_TYPES[pokemonData.types[0].type.name];
    }

    /*
    <h2 className="sub-title">Moves:</h2>
    {pokemonData.moves.length > 0 ? pokemonData.moves.map(move => <MoveInCard moveName={move.move.name} pokedex={pokedex} />): <></>}
    
    */


    //foloseste grid in loc de flex ua
    return (
        <div className={`${shadowColor} ${borderColor} shadow-md bg-gray-600 border-2 rounded-md w-52 h-md m-5 grid grid-cols-2`}>
            <div className="flex col-span-2 justify-center align-items-center  h-15">
                <a className={"flex items-center"} href={`/pokemon/${pokemonData.name}`}>
                    <h1 className="font-medium m-2 break-normal text-wrap uppercase hover:text-gray-300">{pokemonData.name.substring(0,30).replaceAll('-', ' ')}
                    </h1>
                </a>
                <LikePokemonButton pokemon_id={pokemonData.id} pokemonLikedByUser={pokemonLikedByUser} setPokemonLikedByUser={setPokemonLikedByUser} />
            </div>
            <div className={"inline-block align-middle"}>
                <img className={`justify-self-center bg-gray-700 shadow-lg rounded-md size-20 my-5 mx-3`} src={pokemonData.sprites.front_default}></img>
            </div>
            <div className={""}>
                <h2 className="">Abilities:</h2>
                {pokemonData.abilities.length > 0 ? pokemonData.abilities.map(ability => <LinkToResourcePage key={ability.ability.name} resource = {"ability"} id = {ability.ability.name} name = {ability.ability.name} className="hover:text-blue-50"/>) : <></>}
            </div>
        </div>

    );
}

export default PokemonCard;
