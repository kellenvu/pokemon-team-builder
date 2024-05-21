import React, { useState } from 'react';
import './App.css';
import PokemonTeam from '../PokemonTeam/PokemonTeam';
import Slider from '../Slider/Slider';
import TypeCoverage from '../TypeCoverage/TypeCoverage';
import Recommendations from '../Recommendations/Recommendations';
import pokemon from 'pokemon';

function App() {
  const [numPickers, setNumPickers] = useState(6);
  const [pokemonTeam, setPokemonTeam] = useState(
    Array(6).fill({ name: '', moveTypes: [], pokemonTypes: [] })
  );

  const handleSliderChange = (event) => {
    const newSize = Number(event.target.value);
    setNumPickers(newSize);
    setPokemonTeam((prevTeam) => {
      if (newSize > prevTeam.length) {
        return prevTeam.concat(Array(newSize - prevTeam.length).fill({ name: '', moves: [], pokemonTypes: [] }));
      } else {
        return prevTeam.slice(0, newSize);
      }
    });
  };

  const handlePickerChange = (index) => async (name, moves) => {
    let pokemonTypes = [];
    if (name) {
      const pokemonId = pokemon.getId(name);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();
      pokemonTypes = data.types.map(typeInfo => typeInfo.type.name);
    }

    setPokemonTeam((prevTeam) => {
      const newTeam = [...prevTeam];
      newTeam[index] = { name, moveTypes: moves, pokemonTypes };
      return newTeam;
    });
  };

  const filteredPokemonTeam = pokemonTeam
    .filter(pokemon => pokemon.name !== '')
    .reduce((acc, pokemon, index, array) => {
      const nameCount = array.filter(p => p.name === pokemon.name).length;
      if (nameCount > 1) {
        const sameNameIndex = array.slice(0, index + 1).filter(p => p.name === pokemon.name).length;
        acc.push({ ...pokemon, name: `${pokemon.name} ${sameNameIndex}` });
      } else {
        acc.push(pokemon);
      }
      return acc;
    }, []);


  return (
    <div className="App">
      <h1 className="mb-3">Pokémon Team Builder</h1>
      <Slider className="mb-3" value={numPickers} onChange={handleSliderChange} />
      <PokemonTeam numPickers={numPickers} onPickerChange={handlePickerChange} />
      <div className="analysis-section">
        <TypeCoverage teamSize={numPickers} pokemonTeam={filteredPokemonTeam} />
        <Recommendations pokemonTeam={filteredPokemonTeam} teamSize={numPickers} />
      </div>
    </div>
  );
}

export default App;
