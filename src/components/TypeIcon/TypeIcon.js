import React from 'react';
import './TypeIcon.css';

const TypeIcon = ({ type }) => {
  return <span className={`tb-type-icon tb-row-${type}`}>{type}</span>;
};

export default TypeIcon;
