import React from 'react';
import './Slider.css';

const Slider = ({ value, onChange }) => {
  return (
    <div className="slider-container">
      <label htmlFor="pokemon-slider" className="slider-label">Team Size: {value}</label>
      <input
        id="pokemon-slider"
        type="range"
        min="0"
        max="6"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Slider;
