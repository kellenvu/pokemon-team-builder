import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import pokemon from 'pokemon';
import './PokemonPicker.css';
import TypesList from './TypesList/TypesList';
import TypeIcon from '../../TypeIcon/TypeIcon';

const PokemonPicker = ({ onPickerChange }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemonImage, setPokemonImage] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const pokemonOptions = pokemon.all().slice(0, 649).sort().map((name) => ({
    label: name,
    value: name,
  }));

  const handlePokemonChange = async (selectedOption) => {
    const name = selectedOption ? selectedOption.value : '';
    setSelectedPokemon(selectedOption);
    onPickerChange(name, selectedTypes);
    await fetchPokemonData(name);
  };

  const handleTypeToggle = (type, isSelected) => {
    const newTypes = isSelected
      ? [...selectedTypes, type]
      : selectedTypes.filter((t) => t !== type);
    setSelectedTypes(newTypes);
    onPickerChange(selectedPokemon ? selectedPokemon.value : '', newTypes);
  };

  const fetchPokemonData = async (name) => {
    try {
      const pokemonId = pokemon.getId(name);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();
  
      const showdownImage = data.sprites.other?.showdown?.front_default;
      const defaultImage = data.sprites.front_default;
  
      setPokemonImage(showdownImage || defaultImage);
  
      let types = data.types.map(typeInfo => typeInfo.type.name);
      
      const pastTypes = data.past_types.find(pt => pt.generation.name === 'generation-v');
      if (pastTypes) {
        types = pastTypes.types.map(typeInfo => typeInfo.type.name);
      }
  
      setPokemonTypes(types);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setPokemonImage('');
      setPokemonTypes([]);
    }
  };  

  return (
    <div className="pokemon-picker">
      <Select
        value={selectedPokemon}
        onChange={handlePokemonChange}
        options={pokemonOptions}
        isClearable
        placeholder="Select"
      />
      <div className="pokemon-types">
        {pokemonTypes.map(type => (
          <TypeIcon key={type} type={type} />
        ))}
      </div>
      <div className="pokemon-image-box">
        {pokemonImage && (
          <img
            src={pokemonImage}
            alt={selectedPokemon ? selectedPokemon.label : ''}
            className="pokemon-image"
            onError={() => setPokemonImage('')}
          />
        )}
      </div>
      <p className="">Damaging Moves:</p>
      <TypesList selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} />
    </div>
  );
};

export default PokemonPicker;
