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

    if(!teamData)   return (<></>);

    let interactionButtons = <></>;

    if(!viewOnly){
        interactionButtons = (<>
            <button className={"m-3 hover:text-blue-100"} onClick={() => setCurrentVisibleComponent("EditTeam")}> Edit Team </button>
            <button className={"m-3 hover:text-red-100"} onClick={() => {remove_team(teamID); setCurrentVisibleComponent("RemovedTeam")}}> Remove Team </button>
        </>);
    }
    
    return(
    <div className={"text-center border-2 border-gray-700 rounded-xl m-2 h-100"}>
        <h1 className={"text-2xl font-semibold my-3"}> {teamData.teamReply[0].team} </h1>
        <p className={"mx-2"}> {teamData.teamReply[0].team_description} </p>
        <PokemonInTeamArray  viewOnly={viewOnly} teamID = {teamID} pokedex={pokedex} pokemonIDS={pokemonIDS}  setPokemonIDS={setPokemonIDS} />
        {interactionButtons}
    </div>
    );
}
export default ViewTeam;
