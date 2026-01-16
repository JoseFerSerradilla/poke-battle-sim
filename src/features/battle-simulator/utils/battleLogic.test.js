import { simulateCombat, simulateBattle } from './battleLogic';

describe('battleLogic', () => {
  describe('simulateCombat', () => {
    const pokemon1 = {
      id: 1,
      name: 'charmander',
      sprite: 'sprite1.png',
      stats: {
        attack: 52,
        defense: 43,
        speed: 65,
      },
    };

    const pokemon2 = {
      id: 2,
      name: 'squirtle',
      sprite: 'sprite2.png',
      stats: {
        attack: 48,
        defense: 65,
        speed: 43,
      },
    };

    test('el Pokémon más rápido ataca primero y gana si su ataque supera la defensa', () => {
      const result = simulateCombat(pokemon1, pokemon2);

      expect(result.winner.name).toBe('squirtle');
      expect(result.loser.name).toBe('charmander');
      expect(result.reason).toContain('charmander ataca primero');
      expect(result.reason).toContain('squirtle contraataca');
    });

    test('el Pokémon más rápido gana si ninguno supera la defensa del otro', () => {
      const strongDefensePokemon1 = {
        ...pokemon1,
        stats: { attack: 40, defense: 80, speed: 70 },
      };

      const strongDefensePokemon2 = {
        ...pokemon2,
        stats: { attack: 35, defense: 90, speed: 60 },
      };

      const result = simulateCombat(strongDefensePokemon1, strongDefensePokemon2);

      expect(result.winner.id).toBe(strongDefensePokemon1.id);
      expect(result.reason).toContain('más rápido');
    });

    test('el Pokémon más rápido gana si su ataque supera la defensa del rival', () => {
      const fastAndStrongPokemon = {
        ...pokemon1,
        stats: { attack: 100, defense: 50, speed: 90 },
      };

      const slowPokemon = {
        ...pokemon2,
        stats: { attack: 60, defense: 60, speed: 40 },
      };

      const result = simulateCombat(fastAndStrongPokemon, slowPokemon);

      expect(result.winner.id).toBe(fastAndStrongPokemon.id);
      expect(result.reason).toContain('ataca primero');
      expect(result.reason).toContain('supera la defensa');
    });

    test('retorna las estadísticas de ambos Pokémon', () => {
      const result = simulateCombat(pokemon1, pokemon2);

      expect(result.stats).toHaveProperty('charmander');
      expect(result.stats).toHaveProperty('squirtle');
      expect(result.stats.charmander).toEqual({
        attack: 52,
        defense: 43,
        speed: 65,
      });
      expect(result.stats.squirtle).toEqual({
        attack: 48,
        defense: 65,
        speed: 43,
      });
    });

    test('maneja correctamente velocidades iguales (el primero ataca primero)', () => {
      const equalSpeedPokemon1 = {
        ...pokemon1,
        stats: { attack: 70, defense: 50, speed: 50 },
      };

      const equalSpeedPokemon2 = {
        ...pokemon2,
        stats: { attack: 40, defense: 60, speed: 50 },
      };

      const result = simulateCombat(equalSpeedPokemon1, equalSpeedPokemon2);

      expect(result.winner.id).toBe(equalSpeedPokemon1.id);
    });
  });

  describe('simulateBattle', () => {
    const team1 = [
      {
        id: 1,
        name: 'charmander',
        sprite: 'sprite1.png',
        stats: { attack: 52, defense: 43, speed: 65 },
      },
      {
        id: 2,
        name: 'charizard',
        sprite: 'sprite2.png',
        stats: { attack: 84, defense: 78, speed: 100 },
      },
    ];

    const team2 = [
      {
        id: 3,
        name: 'squirtle',
        sprite: 'sprite3.png',
        stats: { attack: 48, defense: 65, speed: 43 },
      },
      {
        id: 4,
        name: 'wartortle',
        sprite: 'sprite4.png',
        stats: { attack: 63, defense: 80, speed: 58 },
      },
    ];

    test('simula una batalla completa entre dos equipos', () => {
      const result = simulateBattle(team1, team2);

      expect(result).toHaveProperty('rounds');
      expect(result).toHaveProperty('winner');
      expect(result).toHaveProperty('team1Stats');
      expect(result).toHaveProperty('team2Stats');
    });

    test('las rondas contienen información completa del combate', () => {
      const result = simulateBattle(team1, team2);

      expect(result.rounds.length).toBeGreaterThan(0);

      const firstRound = result.rounds[0];
      expect(firstRound).toHaveProperty('roundNumber');
      expect(firstRound).toHaveProperty('pokemon1');
      expect(firstRound).toHaveProperty('pokemon2');
      expect(firstRound).toHaveProperty('winner');
      expect(firstRound).toHaveProperty('loser');
      expect(firstRound).toHaveProperty('reason');
      expect(firstRound).toHaveProperty('stats');
    });

    test('determina correctamente el equipo ganador', () => {
      const result = simulateBattle(team1, team2);

      expect([1, 2]).toContain(result.winner);
    });

    test('calcula correctamente las estadísticas de los equipos', () => {
      const result = simulateBattle(team1, team2);

      expect(result.team1Stats.total).toBe(2);
      expect(result.team2Stats.total).toBe(2);
      expect(result.team1Stats.alive + result.team1Stats.defeated).toBe(2);
      expect(result.team2Stats.alive + result.team2Stats.defeated).toBe(2);
    });

    test('el ganador continúa contra el siguiente Pokémon del equipo rival', () => {
      const result = simulateBattle(team1, team2);

      // Verificar que hay múltiples rondas (el ganador de una ronda pelea contra el siguiente)
      expect(result.rounds.length).toBeGreaterThanOrEqual(2);
    });

    test('la batalla termina cuando un equipo se queda sin Pokémon', () => {
      const result = simulateBattle(team1, team2);

      // Un equipo debe tener 0 Pokémon vivos
      const hasZeroAlive = result.team1Stats.alive === 0 || result.team2Stats.alive === 0;
      expect(hasZeroAlive).toBe(true);
    });

    test('maneja equipos con un solo Pokémon', () => {
      const singlePokemonTeam1 = [team1[0]];
      const singlePokemonTeam2 = [team2[0]];

      const result = simulateBattle(singlePokemonTeam1, singlePokemonTeam2);

      expect(result.rounds.length).toBe(1);
      expect(result.winner).toBeDefined();
    });
  });
});
