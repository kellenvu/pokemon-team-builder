import React, { useState } from 'react';
import './TypeButton.css';

const TypeButton = ({ type, onToggle, disabled }) => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    if (!disabled || toggled) {
      setToggled(!toggled);
      onToggle(type, !toggled);
    }
  };

  return (
    <div
      className={`type-box type-${type.toLowerCase()} ${toggled ? 'toggled' : ''}`}
      onClick={handleToggle}
    >
      {type}
    </div>
  );
};

export default TypeButton;
