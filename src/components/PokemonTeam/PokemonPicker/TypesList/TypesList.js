import React from 'react';
import TypeButton from './TypeButton/TypeButton';
import './TypesList.css';

const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel'
];

const TypesList = ({ selectedTypes, onTypeToggle }) => {
  const handleToggle = (type, isSelected) => {
    onTypeToggle(type, isSelected);
  };

  return (
    <div className="types-list">
      {TYPES.map((type) => (
        <TypeButton
          key={type}
          type={type}
          selected={selectedTypes.includes(type)}
          onToggle={handleToggle}
          disabled={selectedTypes.length >= 4 && !selectedTypes.includes(type)}
        />
      ))}
    </div>
  );
};

export default TypesList;
