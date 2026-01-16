import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BattleResults from './BattleResults';

describe('BattleResults', () => {
  const mockOnReset = jest.fn();

  const mockBattleResult = {
    winner: 1,
    rounds: [
      {
        roundNumber: 1,
        pokemon1: {
          id: 4,
          name: 'charmander',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
          stats: { attack: 52, defense: 43, speed: 65 },
        },
        pokemon2: {
          id: 7,
          name: 'squirtle',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
          stats: { attack: 48, defense: 65, speed: 43 },
        },
        winner: {
          id: 7,
          name: 'squirtle',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
          stats: { attack: 48, defense: 65, speed: 43 },
        },
        loser: {
          id: 4,
          name: 'charmander',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
          stats: { attack: 52, defense: 43, speed: 65 },
        },
        reason: 'charmander ataca primero (Speed: 65) pero no supera la defensa (43). squirtle contraataca con ataque (48) superando la defensa (43)',
        stats: {
          charmander: { attack: 52, defense: 43, speed: 65 },
          squirtle: { attack: 48, defense: 65, speed: 43 },
        },
      },
      {
        roundNumber: 2,
        pokemon1: {
          id: 6,
          name: 'charizard',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
          stats: { attack: 84, defense: 78, speed: 100 },
        },
        pokemon2: {
          id: 7,
          name: 'squirtle',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
          stats: { attack: 48, defense: 65, speed: 43 },
        },
        winner: {
          id: 6,
          name: 'charizard',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
          stats: { attack: 84, defense: 78, speed: 100 },
        },
        loser: {
          id: 7,
          name: 'squirtle',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
          stats: { attack: 48, defense: 65, speed: 43 },
        },
        reason: 'charizard ataca primero (Speed: 100) y su ataque (84) supera la defensa de squirtle (65)',
        stats: {
          charizard: { attack: 84, defense: 78, speed: 100 },
          squirtle: { attack: 48, defense: 65, speed: 43 },
        },
      },
    ],
    team1Stats: {
      alive: 1,
      defeated: 1,
      total: 2,
    },
    team2Stats: {
      alive: 0,
      defeated: 1,
      total: 1,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el resultado global con el equipo ganador', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText(/¡Equipo Fuego gana!/i)).toBeInTheDocument();
  });

  test('muestra el ganador correcto cuando gana el equipo 2', () => {
    const team2WinResult = {
      ...mockBattleResult,
      winner: 2,
    };

    render(
      <BattleResults
        battleResult={team2WinResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText(/¡Equipo Agua gana!/i)).toBeInTheDocument();
  });

  test('muestra las estadísticas de ambos equipos', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    expect(screen.getAllByText(/Equipo Fuego/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Equipo Agua/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pokémon con vida/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pokémon debilitados/i).length).toBeGreaterThan(0);
  });

  test('muestra el historial de combates con el número correcto de rondas', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText(/Historial de Combates \(2 rondas\)/i)).toBeInTheDocument();
    expect(screen.getByText('Ronda 1')).toBeInTheDocument();
    expect(screen.getByText('Ronda 2')).toBeInTheDocument();
  });

  test('muestra los detalles de cada ronda correctamente', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    // Verificar que hay nombres de Pokémon en el documento
    expect(screen.getAllByText(/charmander/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/squirtle/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/charizard/i).length).toBeGreaterThan(0);
  });

  test('muestra las estadísticas de los Pokémon en cada ronda', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    // Verificar que se muestran las estadísticas
    expect(screen.getAllByText(/Ataque: 52/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Defensa: 43/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Velocidad: 65/i).length).toBeGreaterThan(0);
  });

  test('muestra la razón del resultado de cada combate', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    expect(screen.getAllByText(/charmander ataca primero/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/squirtle contraataca/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/charizard ataca primero/i).length).toBeGreaterThan(0);
  });

  test('el botón "Nueva Batalla" está presente', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    const button = screen.getByRole('button', { name: /Nueva Batalla/i });
    expect(button).toBeInTheDocument();
  });

  test('llama a onReset cuando se hace clic en "Nueva Batalla"', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    const button = screen.getByRole('button', { name: /Nueva Batalla/i });
    fireEvent.click(button);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  test('destaca al ganador de cada ronda con un emoji de trofeo', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    // Buscar el emoji de trofeo en el nombre de los ganadores
    const roundWinners = screen.getAllByText(/🏆/);
    expect(roundWinners.length).toBe(2); // Dos rondas, dos ganadores
  });

  test('muestra correctamente el VS entre los Pokémon', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    const vsElements = screen.getAllByText('VS');
    expect(vsElements.length).toBe(2); // Dos rondas, dos VS
  });

  test('maneja correctamente una batalla con una sola ronda', () => {
    const singleRoundResult = {
      ...mockBattleResult,
      rounds: [mockBattleResult.rounds[0]],
      team1Stats: { alive: 0, defeated: 1, total: 1 },
      team2Stats: { alive: 1, defeated: 0, total: 1 },
    };

    render(
      <BattleResults
        battleResult={singleRoundResult}
        team1Name="Equipo A"
        team2Name="Equipo B"
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText(/Historial de Combates/i)).toBeInTheDocument();
    expect(screen.getByText('Ronda 1')).toBeInTheDocument();
    expect(screen.queryByText('Ronda 2')).not.toBeInTheDocument();
  });

  test('renderiza las imágenes de los Pokémon', () => {
    render(
      <BattleResults
        battleResult={mockBattleResult}
        team1Name="Equipo Fuego"
        team2Name="Equipo Agua"
        onReset={mockOnReset}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    // Verificar que las imágenes tienen los sprites correctos
    const charmanderImg = images.find(img => img.alt === 'charmander');
    expect(charmanderImg).toBeInTheDocument();
  });
});
