import React from 'react';
import { add_team } from '../scripts/REST_api_calls.js';

function tryAddingTeam(name, description) {

  if (name == '' && description == '') return -1;

  try {
    const result = add_team(name, description);
    if (result == 1) {
      console.log("ERROR ADDING TEAM.");
    }
    console.log("Added team.");
  } catch (error) {
    console.log(error);
  }

}


function CreateTeam() {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  return(
    <div>
      <form onSubmit={(e) => {e.preventDefault(); tryAddingTeam(name, description); }}>
        <label className={"on-black"}>Name: </label>
        <input value={name} name="name" placeholder="Team Name" onChange={e => setName(e.target.value)} />
        <label className={"on-black"}>Description: </label>
        <input value={description} name="description" placeholder="Team Description"  onChange={e => setDescription(e.target.value)} />
        <button type="submit">
          Ceate New Team
        </button>
      </form>
    </div>
  );

}




export default CreateTeam;
