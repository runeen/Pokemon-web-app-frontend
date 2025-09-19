import React from 'react';
import { get_team, remove_team } from '../scripts/REST_api_calls.js';
import PokemonInTeamArray from './PokemonInTeamArray.jsx';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ViewTeam( {viewOnly, teamID, setCurrentVisibleComponent, pokemonIDS, setPokemonIDS, pokedex} ) {
    const [teamData, setTeamData] = React.useState(null);


    React.useEffect(() => {
        async function effect_func(){
            if(!teamData){
                await delay(300);
                const teamDataAPI = await get_team(teamID);
                setTeamData(teamDataAPI);
            }
        }
        effect_func();
    }, []);

    if(!teamData)   return (<h1> getting team data </h1>);

    let interactionButtons = <></>;

    if(!viewOnly){
        interactionButtons = (<>
            <button onClick={() => setCurrentVisibleComponent("EditTeam")}> Edit Team </button>
            <button onClick={() => {remove_team(teamID); setCurrentVisibleComponent("RemovedTeam")}}> Remove Team </button>
        </>);
    }
    
    return(
    <div className={"text-center "}>
        <h1 className={"text-xl font-semibold"}> {teamData.teamReply[0].team} </h1>
        <p className={"on-black"}> {teamData.teamReply[0].team_description} </p>
        <PokemonInTeamArray viewOnly={viewOnly} teamID = {teamID} pokedex={pokedex} pokemonIDS={pokemonIDS}  setPokemonIDS={setPokemonIDS} />
        {interactionButtons}
    </div>
    );
}
export default ViewTeam;
