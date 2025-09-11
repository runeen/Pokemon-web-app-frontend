import React from 'react';
import AbilityInCard from '../Ability/AbilityInCard.jsx';
import LinkToResourcePage from '../LinkToResourcePage.jsx';
import LikePokemonButton from './LikePokemonButton.jsx';


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
        return (<div className="pokemon-card"><p>loading pokemon ID: {id}</p></div>);
    }

    /*
    <h2 className="sub-title">Moves:</h2>
    {pokemonData.moves.length > 0 ? pokemonData.moves.map(move => <MoveInCard moveName={move.move.name} pokedex={pokedex} />): <></>}
    */
    return (
        <div className="pokemon-card">
            <a href={`/pokemon/${pokemonData.name}`}>
                <h1 className="title pokemon-name">{pokemonData.name}</h1>
                <img className="pokemon-image" src={pokemonData.sprites.front_default}></img>
            </a>
            <h2 className="sub-title">Abilities:</h2>
                {pokemonData.abilities.length > 0 ? pokemonData.abilities.map(ability => <LinkToResourcePage resource = {"ability"} id = {ability.ability.name} name = {ability.ability.name} className="ability-item"/>) : <></>}
            <LikePokemonButton pokemon_id={pokemonData.id} pokemonLikedByUser={pokemonLikedByUser} setPokemonLikedByUser={setPokemonLikedByUser} />
        </div>
    );
}

export default PokemonCard;
