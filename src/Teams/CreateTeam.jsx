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
    <div className={"m-2 h-100 text-center border-2 border-gray-700 rounded-xl"}>
      <form className={"flex flex-col items-center gap-2"} onSubmit={(e) => {e.preventDefault(); tryAddingTeam(name, setName, description, setDescription, teamIDArray, setTeamIDArray); }}>
        <label className={"my-4"}>Name: </label>
        <input className={"w-40 bg-gray-300 text-black"} value={name} name="name" placeholder="Team" onChange={e => setName(e.target.value)} />
        <label className={"my-4"}>Description: </label>
        <textarea className={"w-50 bg-gray-300 text-black resize-none"} value={description} name="description" placeholder="Aspirations and long term goals"  onChange={e => setDescription(e.target.value)} rows={5} columns={200} wrap={"hard"}/>
        <button className={"my-6 hover:text-blue-100"} type="submit">
          Ceate New Team
        </button>
      </form>
    </div>
  );

}




export default CreateTeam;
