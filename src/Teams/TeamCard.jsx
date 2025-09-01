import React from 'react';
import PokemonArray from '../Pokemon/PokemonArray.jsx';
async function getTeamData(team_id, setApiResponse) {
  const request = await fetch(`http://localhost:3000/api/team/${team_id}`);
  const response = await request.json();
  console.log("fetched user api data");
  console.log("TEAM API: ", response);
  setApiResponse(response);
}




function TeamCard( {team_id, pokedex, setPokemonLikedByUser} ) {
  const [teamData, setTeamData] = React.useState(null);

  React.useEffect(() => {
    try {
      getTeamData(team_id, setTeamData);
    } catch (error) {
      console.log(error);
    }
  }, [team_id]);

  if (!teamData) {
    return (<h1 className={"on-black"}> Getting Team Data</h1>);
  }


  const echipaArray = <PokemonArray pokedex={pokedex} idArray={
    teamData.pokemonReply.map(entry => entry.pokemon_id)
  } pokemonPerPage={3} setLikes={setPokemonLikedByUser}
   />

  //TODO: FA CA TEAM REPLY SA NU TRIMITA UN ARR CU UN ELEMENT
  return (
      <div>
        <h3 className={"on-black"}> UTILIZATOR: {teamData.teamReply[0].owner} </h3>
        <h1 className={"on-black"}> ECHIPIA: {teamData.teamReply[0].team} </h1>
        <p>  DESCRIERE: {teamData.teamReply[0].team_description}</p>
        {echipaArray}
      </div>
  );

};

export default TeamCard;
