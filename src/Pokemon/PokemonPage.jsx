import React from "react";
import PokemonArray from "./PokemonArray";
import PokemonCard from "./PokemonCard";
import Nav from "./Nav";
import LinkToResourcePage from "../LinkToResourcePage";

function getToken(){
  try {return JSON.parse(sessionStorage.token).token;}
  catch {return null};
}

function PokemonPage({ pokedex, id }) {
  console.log(id);
  const token = getToken();

  React.useEffect(() => {
    async function likePokemon(){
      if(!isNaN(id) && token){
        const response = await fetch(`http://localhost:3000/api/pokemon/${id}`, {method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });
        if(response.status == 401){
          sessionStorage.clear();
          window.location.replace("/login");
        }
      }
    }; likePokemon();
  });

  const [pokemonData, setPokemonData] = React.useState(null);
  const [pokemonSpecies, setPokemonSpecies] = React.useState(null);
  React.useEffect(() => {
    async function getPokemonData() {
      if(id == null) return;
      if (pokemonData == null) {
        const response = await pokedex.getPokemonByName(id);
        console.log("fetched data");
        setPokemonData(response);
      }

      if (pokemonData != null && pokemonSpecies == null) {
        const response = await pokedex.resource(pokemonData.species.url);
        console.log("fetched data");
        setPokemonSpecies(response);
      }
    }
    getPokemonData();
  }, [id, pokedex, pokemonData, pokemonSpecies]);

  if(!id) return (<PokemonArray pokedex={pokedex} idArray={[1]} pokemonPerPage={10}/>);

  if (!pokemonData || !pokemonSpecies) {
    return <div>Loading Pokémon data.</div>;
  }

  const speciesFlavorText = pokemonSpecies.flavor_text_entries.find(
    (entry) => entry.language.name == "en"
  ).flavor_text;


  const movesArray = pokemonData.moves.map(move => <LinkToResourcePage className={"moves-item"} resource={"move"}  id = {move.move.name} name = {move.move.name} />);

  return (
    <div className="page pokemon-page">
        <PokemonCard pokedex={pokedex} id={id}/>
        <p>
          {speciesFlavorText}
        </p>
        <hr />
        <h2 className="on-black">Sprites:</h2>
        <div className="pokemon sprites">
          <div><h3 className="on-black"> Front:</h3><img className="sprite" src={pokemonData.sprites.front_default}></img></div>
          <div><h3 className="on-black"> Front shiny:</h3><img className="sprite" src={pokemonData.sprites.front_shiny}></img></div>
          <div><h3 className="on-black"> Back:</h3><img className="sprite" src={pokemonData.sprites.back_default}></img></div>
          <div><h3 className="on-black"> Back shiny:</h3><img className="sprite" src={pokemonData.sprites.back_shiny}></img></div>
        </div>
        <hr />
        <h2 className="on-black">Moves:</h2>
        <div className="pokemon moves">
          {movesArray}
        </div>
    </div>
  );

}

export default PokemonPage;
