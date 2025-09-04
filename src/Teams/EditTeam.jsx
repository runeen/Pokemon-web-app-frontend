import React from 'react';
import { edit_team} from '../scripts/REST_api_calls.js';

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

  return(
    <div>
      <h1 className={"title on-black"}>Edit Team:</h1>
      <form onSubmit={(e) => {e.preventDefault(); tryEditTeam(name, description, teamId); }}>
        <label className={"on-black"}>Name: </label>
        <input value={name} name="name" placeholder="Team" onChange={e => setName(e.target.value)} />
        <label className={"on-black"}>Description: </label>
        <textarea value={description} name="description" placeholder="Aspirations and long term goals"  onChange={e => setDescription(e.target.value)} rows={5} columns={200} wrap={"hard"}/>
        <input type={"number"} name="team_id" onChange={e => setTeamId(e.target.value)}/>
        <button type="submit">
          Edit New Team
        </button>
      </form>
    </div>
  );

}




export default EditTeam;
