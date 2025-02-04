import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonSearch from "./PokemonSearch";
import "./PokemonSearch.css";
import pokemonLogo from "./assets/PokeLogo.svg";
import Nav from "./Nav";
import Favorites from "./Favorites";

function Home() {
  return (
    <div>
      <Link to="/pokemon-search">
        <img src={pokemonLogo} className="logo" alt="Pokemon logo" />
      </Link>
      <h1>Welcome to the Pokémon App</h1>
      <p>Your comprehensive guide for all original 152+ Pokémon.</p>
    </div>
  );
}

function App() {
  const [favorites, setFavorites] = useState([]);

  // Function to add a Pokémon to favorites
  const addToFavorites = (pokemon) => {
    if (!favorites.some((fav) => fav.name === pokemon.name)) {
      setFavorites([...favorites, pokemon]);
    } else {
      alert(`${pokemon.name.toUpperCase()} is already in your favorites!`);
    }
  };

  // Function to remove a Pokémon from favorites
  const removeFromFavorites = (pokemonName) => {
    setFavorites(favorites.filter((fav) => fav.name !== pokemonName));
  };

  return (
    <Router>
      <Nav /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/pokemon-search" 
          element={<PokemonSearch favorites={favorites} addToFavorites={addToFavorites} />} 
        />
        <Route 
          path="/favorites" 
          element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
