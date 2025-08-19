import PokemonPage from "../Pokemon/PokemonPage";
import PokemonArray from "../Pokemon/PokemonArray";
import Nav from "../Pokemon/Nav";
import AbilityPage from "../Ability/AbilityPage";

import { useParams } from "react-router-dom";
import MovePage from "../Moves/MovePage";


function ResourceDetailsPage( {pokedex, resource, id} ) {

    const { id :paramsId } = useParams();
    if(!id) id = paramsId;

    const Nav2 = <Nav resource={resource} defaultValue = {id ? id : ""} />
    if (resource == "pokemon") {
        return (
            <>
            {Nav2}
            <PokemonPage pokedex={pokedex} id={id} />
            </>
        );
    }

    if (resource == "ability") {
        return (
            <>
                {Nav2}
                <AbilityPage pokedex={pokedex} id={id} />
            </>
        );
    }

    if (resource == "move") { 
        return (
            <>
                {Nav2}
                <MovePage pokedex={pokedex} id={id} />
            </>
        )
    }

}

export default ResourceDetailsPage;