import React, { useEffect, useState } from 'react';
import './Recommendations.css';
import { recommendations, TYPES } from '../analysis';
import TypeIcon from '../TypeIcon/TypeIcon';

const Recommendations = ({ pokemonTeam, teamSize }) => {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    const recs = recommendations(pokemonTeam, teamSize);
    setRecs(recs);
  }, [pokemonTeam, teamSize]);

  const replaceTypesWithIcons = (text) => {
    const regex = new RegExp(`\\b(${TYPES.join('|')})\\b`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => {
      const lowercasedPart = part.toLowerCase();
      if (TYPES.includes(lowercasedPart)) {
        return <TypeIcon key={index} type={lowercasedPart} />;
      }
      return part;
    });
  };

  return (
    <div className="recommendations">
      <div className="recommendations-scroll">
        <h3>Recommendations</h3>
        <ul>
          {recs.map((rec, index) => (
            <li key={index}>
              {replaceTypesWithIcons(rec)}
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
};

export default Recommendations;
