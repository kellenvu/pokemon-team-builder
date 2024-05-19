import React, { useState } from 'react';
import TypeButton from '../TypeButton/TypeButton';
import './TypesList.css';

const types = [
  'Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass',
  'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice',
  'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'
];

const TypesList = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleToggle = (type, isSelected) => {
    setSelectedTypes(prevSelectedTypes => {
      if (isSelected) {
        return [...prevSelectedTypes, type];
      } else {
        return prevSelectedTypes.filter(t => t !== type);
      }
    });
  };

  return (
    <div className="types-list">
      {types.map((type) => (
        <TypeButton
          key={type}
          type={type}
          onToggle={handleToggle}
          disabled={selectedTypes.length >= 4 && !selectedTypes.includes(type)}
        />
      ))}
    </div>
  );
};

export default TypesList;
