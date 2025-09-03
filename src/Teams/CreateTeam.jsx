import React from 'react';
import { add_team } from '../scripts/REST_api_calls.js';

function CreateTeam() {

  return(<button onClick={() => {add_team("testName", "testDescription woaw i am descripting so cool right now!");}}> Ceate New Team </button>);

}




export default CreateTeam;
