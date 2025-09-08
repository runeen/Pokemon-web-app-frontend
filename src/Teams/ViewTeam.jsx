import React from 'react';
import { get_team, remove_team } from '../scripts/REST_api_calls.js';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ViewTeam( {teamID, setCurrentVisibleComponent } ) {
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
    
    return(
    <div>
        <h1 className={"on-black"}> {teamData.teamReply[0].team} </h1>
        <p className={"on-black"}> {teamData.teamReply[0].team_description} </p>
        <button onClick={() => setCurrentVisibleComponent("EditTeam")}> Edit Team </button>
        <button onClick={() => {remove_team(teamID); setCurrentVisibleComponent("RemovedTeam")}}> Remove Team </button>
    </div>
    );
}
export default ViewTeam;
