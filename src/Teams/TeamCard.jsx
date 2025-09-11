import React from 'react';
import { get_team } from '../scripts/REST_api_calls.js';
import EditTeam from './EditTeam.jsx';
import ViewTeam from './ViewTeam.jsx';


function TeamCard( { viewOnly, propsTeamID, pokedex }) {

    // currentVisibleComponent E {"ViewTeam", "EditTeam", "RemovedTeam"}
    const [currentVisibleComponent, setCurrentVisibleComponent] = React.useState("ViewTeam");
    const [teamID, setTeamID] = React.useState(null); 
    const [pokemonInTeam, setPokemonInTeam] = React.useState(null);


    React.useEffect(() => {
        async function holderFunc() {
            const pokemonInTeamFromApi = await get_team(teamID);
            if(pokemonInTeamFromApi) setPokemonInTeam(pokemonInTeamFromApi.pokemonReply);
        }
        if(!pokemonInTeam) holderFunc();
    }, [pokemonInTeam]);
    if(currentVisibleComponent == "RemovedTeam")    return(<></>);


    if(propsTeamID && !teamID) { 
        setTeamID(propsTeamID);
    }

    if(currentVisibleComponent == "EditTeam" && teamID) {
        return (<EditTeam teamID={teamID} setCurrentVisibleComponent={setCurrentVisibleComponent} />);
    }

    return (
        <ViewTeam viewOnly={viewOnly} teamID={teamID} pokemonIDS={pokemonInTeam} setPokemonIDS={setPokemonInTeam} pokedex={pokedex} setCurrentVisibleComponent={setCurrentVisibleComponent} />
    );
}

export default TeamCard;
