import React from "react";

function Favorites({ favorites, removeFromFavorites }) {
  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon added yet!</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((pokemon) => (
            <div key={pokemon.name} className="favorite-item">
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name.toUpperCase()}</p>
              <button className="remove-button" onClick={() => removeFromFavorites(pokemon.name)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
