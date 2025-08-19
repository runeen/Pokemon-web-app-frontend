import AbilityPage from './Ability/AbilityPage';
import { Route, Routes} from "react-router-dom";
import React from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import './App.css'
import PokemonArray from './Pokemon/PokemonArray';
import PokemonPage from './Pokemon/PokemonPage'
import Test from './Pages/Test'
import Login from './authComponents/Login';
import Register from './authComponents/Register'
import ResourceDetailsPage from './Pages/ResourceDetailsPage';

function setToken(token, username){
  sessionStorage.setItem("token", JSON.stringify(token));
  sessionStorage.setItem("username", JSON.stringify(username));
}


function App() {
  const P = new Pokedex;

  return (
  <div className="Title">
    <Routes>
      <Route path="/login" element = {<Login setToken={setToken} />} />
      <Route path="/register" element = {<Register setToken={setToken}/>} />
      <Route path="/" element= {<Test pokedex = {P}/>} />
      <Route path="/pokemon" element= {<ResourceDetailsPage pokedex = {P} resource={"pokemon"}/>} />
      <Route path="/pokemon/:id" element= {<ResourceDetailsPage pokedex = {P} resource={"pokemon"}/>} />
      <Route path="/ability/:id" element= {<ResourceDetailsPage pokedex = {P} resource="ability"/>} />
      <Route path="/move/:id" element= {<ResourceDetailsPage pokedex={P} resource="move"/>}></Route>
    </Routes>
  </div>
  );
}

export default App
