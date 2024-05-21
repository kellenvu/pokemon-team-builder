import React from 'react';
import './TypeButton.css';

const TypeButton = ({ type, selected, onToggle, disabled }) => {
  const handleClick = () => {
    if (!disabled || selected) {
      onToggle(type, !selected);
    }
  };

  return (
    <div
      className={`type-box ${selected ? 'selected' : ''} type-${type.toLowerCase()}`}
      onClick={handleClick}
      style={{ pointerEvents: disabled && !selected ? 'none' : 'auto' }}
    >
      {type}
    </div>
  );
};

export default TypeButton;
