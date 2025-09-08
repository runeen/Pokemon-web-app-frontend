import React from 'react';
import { get_username_teams } from '../scripts/REST_api_calls.js'
import TeamCard from './TeamCard';
import CreateTeam from './CreateTeam';
function TeamCardArray( { propsUsername } ) {
    
    const [teamIDArray, setTeamIDArray] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    
    if(!username && propsUsername) setUsername(propsUsername);

    if(!username && !propsUsername) {
        const sessionUsername = JSON.parse(sessionStorage.getItem("username"));
        if(sessionUsername) setUsername(sessionUsername);
        else window.location.replace('./login') // TODO: pare mai logic sa fie o functie in rest care sa forteze login daca incerci sa accesezi username-ul
    }

    React.useEffect(() => {
        async function get_teams_data() {
            const teamsData = await get_username_teams(username);
            if(teamsData)   setTeamIDArray(teamsData.result.map(entry => entry.id));
        }
        if(!teamIDArray)    get_teams_data();
    }, []);
    
    if(!teamIDArray)    return (<h1>Getting team data...</h1>);

    const teamCards = teamIDArray.map((teamID) => 
        <li key = {teamID}>
            <TeamCard propsTeamID={teamID} />
        </li>
    );
    
    return(
        <div>
            <ul>
                {teamCards}
                <CreateTeam teamIDArray={teamIDArray} setTeamIDArray={setTeamIDArray} />
            </ul>
        </div>
    );
}

export default TeamCardArray;
