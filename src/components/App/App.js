import React, { useState } from 'react';
import './App.css';
import PokemonTeam from '../PokemonTeam/PokemonTeam';
import Slider from '../Slider/Slider';

function App() {
  const [numPickers, setNumPickers] = useState(6);

  const handleSliderChange = (event) => {
    setNumPickers(Number(event.target.value));
  };

  return (
    <div className="App">
      <h1>Pokémon Team Builder</h1>
      <Slider value={numPickers} onChange={handleSliderChange} />
      <PokemonTeam numPickers={numPickers} />
    </div>
  );
}

export default App;
