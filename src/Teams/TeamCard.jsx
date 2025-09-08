import React from 'react';
import { get_team } from '../scripts/REST_api_calls.js';
import EditTeam from './EditTeam.jsx';
import ViewTeam from './ViewTeam.jsx';


function TeamCard( { propsTeamID }) {

    // currentVisibleComponent E {"ViewTeam", "EditTeam", "RemovedTeam"}
    const [currentVisibleComponent, setCurrentVisibleComponent] = React.useState("ViewTeam");
    const [teamID, setTeamID] = React.useState(null); 
    
    if(currentVisibleComponent == "RemovedTeam")    return(<></>);

    if(propsTeamID && !teamID) { 
        setTeamID(propsTeamID);
    }

    if(currentVisibleComponent == "EditTeam" && teamID) {
        return (<EditTeam teamID={teamID} setCurrentVisibleComponent={setCurrentVisibleComponent} />);
    }
    

    return (
        <ViewTeam teamID={teamID} setCurrentVisibleComponent={setCurrentVisibleComponent} />
    );
}

export default TeamCard;
