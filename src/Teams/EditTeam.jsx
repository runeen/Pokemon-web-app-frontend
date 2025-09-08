import React from 'react';
import { edit_team, get_team} from '../scripts/REST_api_calls.js';

function tryEditTeam(name, description, teamID, setCurrentVisibleComponent) {

  if (name == '' && description == '') return -1;

  try {
    const result = edit_team(name, description, teamID);
    if (result == 1) {
      console.log("ERROR EDITING TEAM.");
    }
    console.log("Edited team.");
    setCurrentVisibleComponent("ViewTeam");
  } catch (error) {
    console.log(error);
  }

}


function EditTeam( {teamID, setCurrentVisibleComponent } ) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [teamData, setTeamData] = React.useState(null);

  React.useEffect(() => {
    async function effect_func() {
        if(!teamData) {
            const teamDataAPI = await get_team(teamID);
            setTeamData(teamDataAPI);
            setName(teamDataAPI.teamReply[0].team);
            setDescription(teamDataAPI.teamReply[0].team_description);
        }
    }
    effect_func();
  }, []);

  return(
    <div>
      <h1 className={"title on-black"}>Edit Team:</h1>
      <form onSubmit={(e) => {e.preventDefault(); tryEditTeam(name, description, teamID, setCurrentVisibleComponent); }}>
        <label className={"on-black"}>Name: </label>
        <input value={name} name="name" placeholder="Team" onChange={e => setName(e.target.value)} />
        <label className={"on-black"}>Description: </label>
        <textarea value={description} name="description" placeholder="Aspirations and long term goals"  onChange={e => setDescription(e.target.value)} rows={5} columns={200} wrap={"hard"}/>
        <button type="submit">
          Edit New Team
        </button>
      </form>
    </div>
  );

}




export default EditTeam;
