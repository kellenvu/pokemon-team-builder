import React, { useEffect, useState } from 'react';
import './TypeCoverage.css';
import { analyzeTeam, TYPES, defendersCovered } from '../analysis';
import TypeIcon from '../TypeIcon/TypeIcon';

const TypeCoverage = ({ pokemonTeam }) => {
  const [analysisResult, setAnalysisResult] = useState({});

  useEffect(() => {
    const result = analyzeTeam(pokemonTeam);
    setAnalysisResult(result);
  }, [pokemonTeam]);

  const totalTypes = TYPES.length;
  const coveredByOne = defendersCovered(pokemonTeam, 1);
  const coveredByTwo = defendersCovered(pokemonTeam, 2);
  const coveredByThree = defendersCovered(pokemonTeam, 3);

  return (
    <div className="type-coverage">
      <p className="mb-2">You can counter <b>[this type]</b> using:</p>
      {TYPES.map((type) => (
        <div key={type} className="type-coverage-row">
          <TypeIcon type={type}/>
          <span className="effective-pokemon ms-2">
            {analysisResult[type] && analysisResult[type].join(', ')}
          </span>
        </div>
      ))}
      <div className="summary-stats">
        <p><b>Types that are countered by 1 Pokémon</b>: {coveredByOne} of {totalTypes}</p>
        <p><b>Types that are countered by 2 Pokémon</b>: {coveredByTwo} of {totalTypes}</p>
        <p><b>Types that are countered by 3 Pokémon</b>: {coveredByThree} of {totalTypes}</p>
        <p><b>Overall coverage score</b>: {coveredByOne}/{coveredByTwo}/{coveredByThree}</p>
      </div>
    </div>
  );
};

export default TypeCoverage;
