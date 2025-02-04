import React, { useState } from "react";
import "./PokemonSearch.css";
import Nav from "./Nav";

function PokemonSearch({ favorites, addToFavorites }) {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [showGamesAppearedIn, setGamesAppearedIn] = useState(false);

  const searchPokemon = async () => {
    const pokemonName = document.getElementById("pokemonInput").value.trim().toLowerCase();
    setShowStats(false);
    setGamesAppearedIn(false);
    setCurrentPokemon(null);

    if (!pokemonName) {
      alert("Please enter a Pokémon name or ID.");
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) throw new Error("Pokémon not found");
      const pokemon = await response.json();
      setCurrentPokemon(pokemon);
    } catch (error) {
      alert("Pokémon not found. Please try again.");
    }
  };

  const handleGamesAppearedIn = () => {
    if (currentPokemon) {
      setGamesAppearedIn(true);
    }
  };

  const toggleShowStats = () => {
    setShowStats((prevShowStats) => !prevShowStats);
  };

  // Toggle Games Appeared In Visibility
  const toggleShowGamesAppearedIn = () => {
    setGamesAppearedIn((prevShowGamesAppearedIn) => !prevShowGamesAppearedIn);
  };

  return (
    <div className="container">
      <h1>Pokémon Search</h1>
      <input id="pokemonInput" type="text" placeholder="Enter Pokémon name or ID" />
      <button onClick={searchPokemon}>Search</button>

      {currentPokemon && (
        <div id="result">
          <h2>{currentPokemon.name.toUpperCase()}</h2>
          <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name} />
          <p><strong>Pokémon ID #: </strong> {currentPokemon.id} </p>
          <p><strong>Height:</strong> {currentPokemon.height}</p>
          <p><strong>Weight:</strong> {currentPokemon.weight}</p>
          <p>
            <strong>Types:</strong>{" "}
            {currentPokemon.types.map((typeInfo) => typeInfo.type.name.toUpperCase()).join(", ")}
          </p>
          <button className="star-button" onClick={() => addToFavorites({ 
            name: currentPokemon.name, 
            image: currentPokemon.sprites.front_default 
          })}>
            ⭐ Add to Favorites
          </button>
          <button onClick={toggleShowGamesAppearedIn}>
            {showGamesAppearedIn ? "Hide Games Appeared In" : "Show Games Appeared In"}
            </button>

        </div>
      )}

      {currentPokemon && (
        <button className="stats-button" onClick={toggleShowStats}>
          {showStats ? "Hide Stats" : "Show Stats"}
        </button>
      )}

{showGamesAppearedIn && currentPokemon && (
        <div>
          <h3>Games Appeared In: </h3>
          <ul>
            {currentPokemon.game_indices.map((game, index) => (
              <li key={index}>Pokemon {game.version.name}</li>
            ))}
          </ul>
        </div>
      )}
    


      {showStats && currentPokemon && (
        <div id="stats">
          <h3>Stats for {currentPokemon.name.toUpperCase()}</h3>
          <ul>
            {currentPokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name.toUpperCase()}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );}

  

export default PokemonSearch;
