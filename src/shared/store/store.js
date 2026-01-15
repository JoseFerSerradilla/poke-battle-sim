import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Tema
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Estado del equipo Pokémon
      team: [],

      // Acciones para el equipo
      addPokemonToTeam: (pokemon) =>
        set((state) => ({
          team: state.team.length < 6
            ? [...state.team, pokemon]
            : state.team
        })),

      removePokemonFromTeam: (pokemonId) =>
        set((state) => ({
          team: state.team.filter(pokemon => pokemon.id !== pokemonId)
        })),

      clearTeam: () => set({ team: [] }),

      // Estado de la batalla
      battleState: {
        isActive: false,
        opponent: null,
      },

      // Acciones para la batalla
      startBattle: (opponent) =>
        set({
          battleState: {
            isActive: true,
            opponent,
          }
        }),

      endBattle: () =>
        set({
          battleState: {
            isActive: false,
            opponent: null,
          }
        }),
    }),
    {
      name: 'pokemon-battle-storage',
    }
  )
);

export default useStore;
