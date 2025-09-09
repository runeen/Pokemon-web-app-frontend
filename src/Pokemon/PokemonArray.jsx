import React from "react";
import PokemonCard from "./PokemonCard";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function PokemonArray({ pokedex, idArray, pokemonLikedByUser, setPokemonLikedByUser, pokemonPerPage }) {
  const [page, setPage] = React.useState(0);

  const maxPage = Math.ceil(idArray.length / pokemonPerPage) - 1;
  const lastVisible = page > 0;
  const nextVisible = (page + 1) * pokemonPerPage < idArray.length;

  function handleNextButton() {
    setPage(() => Math.min(page + 1, maxPage));
  }

  function handleLastButton() {
    setPage(() => Math.max(page - 1, 0));
  }

  async function handlePageInputChange(e) {
    let inputString = e.target.value;
    try {
      let inputNumber = Number(inputString) - 1;
      if (inputNumber >= 0) {
        await delay(600);
        setPage(Math.min(inputNumber, maxPage));
        e.target.placeholder = Math.min(inputNumber, maxPage) + 1
        e.target.value = ""
      }
    } catch (error) {
      console.log(error);
    }
  }

  const visiblePokemon = idArray.slice(
    page * pokemonPerPage,
    (page + 1) * pokemonPerPage
  );
  

  console.log("liked pokemon in pokemon array: ", pokemonLikedByUser)
  const visiblePokemonCards = visiblePokemon.map((pokemonId) => (
    <li key = {pokemonId}>
      <PokemonCard key={pokemonId} id={pokemonId} pokedex={pokedex} pokemonLikedByUser={pokemonLikedByUser} setPokemonLikedByUser={setPokemonLikedByUser}/>
    </li>
  ));
  
  let pageSelectElements = <></>;
  if (maxPage > 0) {
      pageSelectElements = (<>
        {lastVisible && (
        <button className={"scroll-button"} onClick={handleLastButton}>
          Last Page
        </button>
      )}

      <p>
        Showing page <input placeholder={page + 1} onChange={handlePageInputChange} size="3"/> out of {maxPage + 1}
      </p>

      {nextVisible && (
        <button className={"scroll-button"} onClick={handleNextButton}>
          Next Page
        </button>
      )}
    </>);
  }

  return (
    <div className="pokemon-array">
      <div className="page">
        <div>
          <ul>{visiblePokemonCards}</ul>
        </div>
      </div>

      {pageSelectElements}
            
    </div>
  );
}

export default PokemonArray;
