import React from "react";
import PokemonArray from "./PokemonArray";
import PokemonCard from "./PokemonCard";
import Nav from "./Nav";
import LinkToResourcePage from "../LinkToResourcePage";
import { get_liked_pokemon_from_session_storage, like_pokemon } from "../scripts/REST_api_calls";

//TODO: Poate ar fi o idee sa avem doua pagini diferite daca esti logat sau nu...
//      Ca e complicat sa avem toata logica aici
function PokemonPage({ pokedex, id }) {

  const [pokemonData, setPokemonData] = React.useState(null);
  const [pokemonLikedByUser, setPokemonLikedByUser] = React.useState(null);
  const [pokemonSpecies, setPokemonSpecies] = React.useState(null);
    
  if(pokemonLikedByUser == null) {
    setPokemonLikedByUser(get_liked_pokemon_from_session_storage());
  }

  React.useEffect(() => {
    async function getPokemonData() {
      if(id == null) return;
      try{
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
      catch {
        console.log("error fetching data from pokeapi");
        setPokemonData("NOT FOUND");
      }
    }
    getPokemonData();
  }, [id, pokedex, pokemonData, pokemonSpecies]);
    

  if (pokemonData == "NOT FOUND") {
    window.location.replace('/#/');
    window.location.reload();

  }
  if(!id) return (<></>);

  if (!pokemonData || !pokemonSpecies) {
    return <div className={"on-black"}>Loading Pokémon data, ID= {id}</div>;
  }

  const speciesFlavorText = pokemonSpecies.flavor_text_entries.find(
    (entry) => entry.language.name == "en"
  ).flavor_text;


  const movesArray = pokemonData.moves.map(move => <LinkToResourcePage className={"hover:text-blue-100"} resource={"move"} key={move.move.name}  id = {move.move.name} name = {move.move.name} />);

  return (
    <div className="flex flex-col text-center items-center gap-4 mt-4">
        <div className="w-full flex flex-col items-center"><PokemonCard pokemonLikedByUser={pokemonLikedByUser} setPokemonLikedByUser={setPokemonLikedByUser} pokedex={pokedex} id={id} /></div>
        <p className="text-md mx-6 text-justify">
          {speciesFlavorText}
        </p>
        <h2 className="on-black">Sprites:</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className=""><h3 className=""> Front:</h3><img className="bg-gray-600 rounded-xl" src={pokemonData.sprites.front_default}></img></div>
          {pokemonData.sprites.front_shiny && <div>
            <h3 className=""> Front shiny:</h3>
            <img className="bg-gray-600 rounded-xl" src={pokemonData.sprites.front_shiny}></img>
          </div>}
          {pokemonData.sprites.back_default && <div>
              <h3 className=""> Back:</h3>
              <img className="bg-gray-600 rounded-xl" src={pokemonData.sprites.back_default}></img>
          </div>}
          {pokemonData.sprites.back_shiny && <div>
            <h3 className=""> Back shiny:</h3>
            <img className="bg-gray-600 rounded-xl" src={pokemonData.sprites.back_shiny}></img>
          </div>}
        </div>
        <hr />
        <h2 className="on-black">Moves:</h2>
        <div className="mx-10 mb-20 flex flex-row flex-wrap gap-4 justify-between">
          {movesArray}
        </div>
    </div>
  );

}

export default PokemonPage;
