import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonTeam from '../PokemonTeam/PokemonTeam';
import Slider from '../Slider/Slider';
import TypeCoverage from '../TypeCoverage/TypeCoverage';
import Recommendations from '../Recommendations/Recommendations';
import pokemon from 'pokemon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  const [numPickers, setNumPickers] = useState(6);
  const [pokemonTeam, setPokemonTeam] = useState(Array(6).fill({ name: '', moveTypes: [], pokemonTypes: [] }));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const numPickersParam = urlParams.get('numPickers');
    const pokemonTeamParam = urlParams.get('pokemonTeam');

    if (numPickersParam) {
      setNumPickers(Number(numPickersParam));
    }

    if (pokemonTeamParam) {
      const parsedTeam = JSON.parse(pokemonTeamParam);
      setPokemonTeam(adjustPokemonTeam(parsedTeam, Number(numPickersParam) || 6));
    }
  }, []);

  useEffect(() => {
    const url = generateURL();
  }, [numPickers, pokemonTeam]);

  const adjustPokemonTeam = (team, size) => {
    const adjustedTeam = [...team];
    while (adjustedTeam.length < size) {
      adjustedTeam.push({ name: '', moveTypes: [], pokemonTypes: [] });
    }
    return adjustedTeam.slice(0, size);
  };

  const handleSliderChange = (event) => {
    const newSize = Number(event.target.value);
    setNumPickers(newSize);
    setPokemonTeam((prevTeam) => adjustPokemonTeam(prevTeam, newSize));
  };

  const handlePickerChange = (index) => async (name, moves) => {
    let pokemonTypes = [];
    if (name) {
      const pokemonId = pokemon.getId(name);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();
      pokemonTypes = data.types.map(typeInfo => typeInfo.type.name);

      const pastTypes = data.past_types.find(pt => pt.generation.name === 'generation-v');
      if (pastTypes) {
        pokemonTypes = pastTypes.types.map(typeInfo => typeInfo.type.name);
      }
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

  const generateURL = () => {
    const params = new URLSearchParams();
    params.set('numPickers', numPickers);
    params.set('pokemonTeam', JSON.stringify(pokemonTeam));
    return `${window.location.origin}?${params.toString()}`;
  };

  const copyToClipboard = () => {
    const url = generateURL();
    navigator.clipboard.writeText(url).then(() => {
      toast('Copied!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        toastId: 'copy-toast',
        style: {
          width: '120px',
          minHeight: 'unset',
          margin: '0 auto',
        },
        closeButton: false,
      });
    });
  };  

  return (
    <div className="App">
      <h1 className="mb-3">Pokémon Gen II-V Team Builder</h1>
      <Slider className="mb-3" value={numPickers} onChange={handleSliderChange} />
      <PokemonTeam numPickers={numPickers} onPickerChange={handlePickerChange} pokemonTeam={pokemonTeam} />
      <div className="analysis-section">
        <TypeCoverage teamSize={numPickers} pokemonTeam={filteredPokemonTeam} />
        <Recommendations pokemonTeam={filteredPokemonTeam} teamSize={numPickers} />
      </div>
      <footer className="footer">
        <div className="copy-link-container">
          <button
            className="copy-link-button"
            onClick={copyToClipboard}
            data-tooltip-id="copyTooltip"
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <Tooltip id="copyTooltip" place="top" effect="solid">
            Copy link to team
          </Tooltip>
        </div>
        Made by <a href="https://kellenvu.github.io/" target="_blank" rel="noopener noreferrer">Kellen Vu</a>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
