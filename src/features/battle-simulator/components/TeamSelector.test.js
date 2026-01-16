import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamSelector from './TeamSelector';
import useStore from '../../../shared/store/store';

// Mock del store
jest.mock('../../../shared/store/store');

describe('TeamSelector', () => {
  const mockOnStartBattle = jest.fn();

  const mockTeams = [
    {
      id: 1,
      name: 'Equipo Fuego',
      pokemon: [
        {
          id: 4,
          name: 'charmander',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
          stats: { attack: 52, defense: 43, speed: 65 },
        },
      ],
    },
    {
      id: 2,
      name: 'Equipo Agua',
      pokemon: [
        {
          id: 7,
          name: 'squirtle',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
          stats: { attack: 48, defense: 65, speed: 43 },
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useStore.mockImplementation((selector) => {
      const state = { teams: mockTeams };
      return selector ? selector(state) : state.teams;
    });
  });

  test('el componente se renderiza correctamente', () => {
    const { container } = render(<TeamSelector onStartBattle={mockOnStartBattle} />);
    expect(container).toBeInTheDocument();
  });

  test('renderiza el título correctamente', () => {
    render(<TeamSelector onStartBattle={mockOnStartBattle} />);
    expect(screen.getByText('Simulador de Batalla')).toBeInTheDocument();
  });

  test('renderiza el botón de pelear', () => {
    render(<TeamSelector onStartBattle={mockOnStartBattle} />);
    const button = screen.getByRole('button', { name: /¡Pelear!/i });
    expect(button).toBeInTheDocument();
  });

  test('el botón está deshabilitado inicialmente', () => {
    render(<TeamSelector onStartBattle={mockOnStartBattle} />);
    const button = screen.getByRole('button', { name: /¡Pelear!/i });
    expect(button).toBeDisabled();
  });
});
