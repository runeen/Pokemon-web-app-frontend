import React from 'react';
import { edit_team, get_user_teams} from '../scripts/REST_api_calls.js';

function tryEditTeam(name, description, team_id) {

  if (name == '' && description == '') return -1;

  try {
    const result = edit_team(name, description, team_id);
    if (result == 1) {
      console.log("ERROR EDITING TEAM.");
    }
    console.log("Edited team.");
  } catch (error) {
    console.log(error);
  }

}


function EditTeam() {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [teamId, setTeamId] = React.useState(0);
  const [userTeams, setUserTeams] = React.useState(null);
  const [selectedTeam, setSelectedTeam] = React.useState(null);

  React.useEffect(() => {
    async function effect_func() {
      if(!userTeams){
        const teamsData = await get_user_teams();
        console.log(teamsData, "TEAMS DATA");
        if (teamsData) {
          setUserTeams(teamsData);
        }
      }
    }
    effect_func();
  }, []);

  let teamDropdownOptions = <></>

  if(Array.isArray(userTeams) && userTeams) {
    console.log(userTeams);
    teamDropdownOptions = (
      <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
        {userTeams.map((x) => {return(<option value={`${x.id}`}> {x.name} </option>)})}
      </select>
    );
  }

  return(
    <div>
      <h1 className={"title on-black"}>Edit Team:</h1>
      <form onSubmit={(e) => {e.preventDefault(); tryEditTeam(name, description, selectedTeam); }}>
        <label className={"on-black"}>Name: </label>
        <input value={name} name="name" placeholder="Team" onChange={e => setName(e.target.value)} />
        <label className={"on-black"}>Description: </label>
        <textarea value={description} name="description" placeholder="Aspirations and long term goals"  onChange={e => setDescription(e.target.value)} rows={5} columns={200} wrap={"hard"}/>
        {teamDropdownOptions}
        <button type="submit">
          Edit New Team
        </button>
      </form>
    </div>
  );

}




export default EditTeam;
