/**
 * Simula un combate 1 vs 1 entre dos Pokémon
 * @param {Object} pokemon1 - Primer Pokémon
 * @param {Object} pokemon2 - Segundo Pokémon
 * @returns {Object} Resultado del combate con el ganador y detalles
 */
export function simulateCombat(pokemon1, pokemon2) {
  const p1Speed = pokemon1.stats.speed;
  const p2Speed = pokemon2.stats.speed;
  const p1Attack = pokemon1.stats.attack;
  const p2Attack = pokemon2.stats.attack;
  const p1Defense = pokemon1.stats.defense;
  const p2Defense = pokemon2.stats.defense;

  // Determinar quién ataca primero
  const firstAttacker = p1Speed >= p2Speed ? pokemon1 : pokemon2;
  const secondAttacker = p1Speed >= p2Speed ? pokemon2 : pokemon1;

  const firstAttackerStats = p1Speed >= p2Speed
    ? { attack: p1Attack, defense: p1Defense, speed: p1Speed }
    : { attack: p2Attack, defense: p2Defense, speed: p2Speed };

  const secondAttackerStats = p1Speed >= p2Speed
    ? { attack: p2Attack, defense: p2Defense, speed: p2Speed }
    : { attack: p1Attack, defense: p1Defense, speed: p1Speed };

  let winner = null;
  let reason = '';

  // El más rápido ataca primero
  if (firstAttackerStats.attack > secondAttackerStats.defense) {
    winner = firstAttacker;
    reason = `${firstAttacker.name} ataca primero (Speed: ${firstAttackerStats.speed}) y su ataque (${firstAttackerStats.attack}) supera la defensa de ${secondAttacker.name} (${secondAttackerStats.defense})`;
  }
  // Si no logra debilitar, el segundo ataca
  else if (secondAttackerStats.attack > firstAttackerStats.defense) {
    winner = secondAttacker;
    reason = `${firstAttacker.name} ataca primero (Speed: ${firstAttackerStats.speed}) pero no supera la defensa (${firstAttackerStats.defense}). ${secondAttacker.name} contraataca con ataque (${secondAttackerStats.attack}) superando la defensa (${firstAttackerStats.defense})`;
  }
  // Si ninguno supera la defensa del otro, gana el más rápido
  else {
    winner = firstAttacker;
    reason = `Ningún Pokémon logra superar la defensa del otro. Gana ${firstAttacker.name} por ser más rápido (Speed: ${firstAttackerStats.speed} vs ${secondAttackerStats.speed})`;
  }

  return {
    winner,
    loser: winner.id === pokemon1.id ? pokemon2 : pokemon1,
    reason,
    stats: {
      [pokemon1.name]: {
        attack: p1Attack,
        defense: p1Defense,
        speed: p1Speed,
      },
      [pokemon2.name]: {
        attack: p2Attack,
        defense: p2Defense,
        speed: p2Speed,
      },
    },
  };
}

/**
 * Simula una batalla completa entre dos equipos
 * @param {Array} team1 - Array de Pokémon del equipo 1
 * @param {Array} team2 - Array de Pokémon del equipo 2
 * @returns {Object} Resultado completo de la batalla
 */
export function simulateBattle(team1, team2) {
  const rounds = [];
  let team1Active = [...team1];
  let team2Active = [...team2];
  let currentTeam1Index = 0;
  let currentTeam2Index = 0;

  // Mientras ambos equipos tengan Pokémon
  while (currentTeam1Index < team1Active.length && currentTeam2Index < team2Active.length) {
    const pokemon1 = team1Active[currentTeam1Index];
    const pokemon2 = team2Active[currentTeam2Index];

    // Simular combate entre los Pokémon actuales
    const combatResult = simulateCombat(pokemon1, pokemon2);

    // Registrar ronda
    const round = {
      roundNumber: rounds.length + 1,
      pokemon1,
      pokemon2,
      winner: combatResult.winner,
      loser: combatResult.loser,
      reason: combatResult.reason,
      stats: combatResult.stats,
    };

    rounds.push(round);

    // Avanzar al siguiente Pokémon del equipo perdedor
    if (combatResult.winner.id === pokemon1.id) {
      currentTeam2Index++;
    } else {
      currentTeam1Index++;
    }
  }

  // Determinar equipo ganador
  const team1Survivors = team1Active.length - currentTeam1Index;
  const team2Survivors = team2Active.length - currentTeam2Index;

  const winnerTeam = team1Survivors > team2Survivors ? 1 : 2;

  return {
    rounds,
    winner: winnerTeam,
    team1Stats: {
      alive: team1Survivors,
      defeated: currentTeam1Index,
      total: team1Active.length,
    },
    team2Stats: {
      alive: team2Survivors,
      defeated: currentTeam2Index,
      total: team2Active.length,
    },
  };
}
