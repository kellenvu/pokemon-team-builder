import React, { useEffect, useState } from 'react';
import TypeButton from './TypeButton/TypeButton';
import './TypesList.css';

const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel'
];

const TypesList = ({ selectedTypes, onTypeToggle }) => {
  const [localSelectedTypes, setLocalSelectedTypes] = useState(selectedTypes);

  useEffect(() => {
    setLocalSelectedTypes(selectedTypes);
  }, [selectedTypes]);

  const handleToggle = (type, isSelected) => {
    onTypeToggle(type, isSelected);
  };

  return (
    <div className="types-list">
      {TYPES.map((type) => (
        <TypeButton
          key={type}
          type={type}
          selected={localSelectedTypes.includes(type)}
          onToggle={handleToggle}
          disabled={localSelectedTypes.length >= 4 && !localSelectedTypes.includes(type)}
        />
      ))}
    </div>
  );
};

export default TypesList;
