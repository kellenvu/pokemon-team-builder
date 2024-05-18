import React, { useState } from 'react';
import pokemon from 'pokemon';
import './PokemonPicker.css';

const PokemonPicker = () => {
    const [selectedPokemon, setSelectedPokemon] = useState('');

    const handleChange = (event) => {
        setSelectedPokemon(event.target.value);
    };

    const formatPokemonName = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    const getFallbackUrl = (name) => {
        return `https://play.pokemonshowdown.com/sprites/gen5/${formatPokemonName(name)}.png`;
    };

    return (
        <div className="pokemon-picker">
            <select value={selectedPokemon} onChange={handleChange}>
                <option value="">Select</option>
                {pokemon.all().sort().map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <div className="pokemon-image-box">
                {selectedPokemon && (
                    <img
                        src={`https://play.pokemonshowdown.com/sprites/ani/${formatPokemonName(selectedPokemon)}.gif`}
                        alt={selectedPokemon}
                        className="pokemon-image"
                        onError={(e) => {
                            e.target.onerror = null; // Prevents infinite loop in case fallback also fails
                            e.target.src = getFallbackUrl(selectedPokemon);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PokemonPicker;
