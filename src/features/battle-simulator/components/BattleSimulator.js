import React, { useState } from 'react';
import { Box } from '@mui/material';
import TeamSelector from './TeamSelector';
import BattleResults from './BattleResults';
import { simulateBattle } from '../utils/battleLogic';

function BattleSimulator() {
  const [battleResult, setBattleResult] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const handleStartBattle = (team1, team2) => {
    // Guardar nombres de equipos
    setTeam1Name(team1.name);
    setTeam2Name(team2.name);

    // Simular batalla
    const result = simulateBattle(team1.pokemon, team2.pokemon);
    setBattleResult(result);
  };

  const handleReset = () => {
    setBattleResult(null);
    setTeam1Name('');
    setTeam2Name('');
  };

  return (
    <Box>
      {!battleResult ? (
        <TeamSelector onStartBattle={handleStartBattle} />
      ) : (
        <BattleResults
          battleResult={battleResult}
          team1Name={team1Name}
          team2Name={team2Name}
          onReset={handleReset}
        />
      )}
    </Box>
  );
}

export default BattleSimulator;
