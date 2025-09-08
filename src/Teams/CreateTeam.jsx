import React from 'react';
import { add_team } from '../scripts/REST_api_calls.js';

async function tryAddingTeam(name, setName, description, setDescription, teamIDArray, setTeamIDArray) {

  if (name == '' || description == '') return -1;

  try {
    const result = await add_team(name, description);
    if (result == -1)   console.log("ERROR ADDING TEAM.");
    console.log(result);
    setTeamIDArray([... teamIDArray, result]);
    console.log("Added team.");
    setName("");
    setDescription("");

  } catch (error) {
    console.log(error);
  }

}


function CreateTeam( { teamIDArray ,setTeamIDArray } ) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  return(
    <div>
      <h1 className={"title on-black"}>CreateTeam </h1>
      <form onSubmit={(e) => {e.preventDefault(); tryAddingTeam(name, setName, description, setDescription, teamIDArray, setTeamIDArray); }}>
        <label className={"on-black"}>Name: </label>
        <input value={name} name="name" placeholder="Team" onChange={e => setName(e.target.value)} />
        <label className={"on-black"}>Description: </label>
        <textarea value={description} name="description" placeholder="Aspirations and long term goals"  onChange={e => setDescription(e.target.value)} rows={5} columns={200} wrap={"hard"}/>
        <button type="submit">
          Ceate New Team
        </button>
      </form>
    </div>
  );

}




export default CreateTeam;
