import { create } from 'zustand';

const useStore = create((set) => ({
  // Estado inicial
  darkMode: false,
  teams: [],
  currentTeam: null,
  teamListDraft: null,
  teamPokemonDraft: null,
  battleState: {
    team1: null,
    team2: null,
    isInProgress: false,
    currentRound: 0,
    rounds: [],
    winner: null,
  },

  // Tema
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // Acciones para la lista de equipos
  createTeam: (name) => {
    const id = Date.now();
    const newTeam = { id, name, pokemon: [] };
    set((state) => ({
      teams: [...state.teams, newTeam],
      currentTeam: newTeam,
    }));
    return id;
  },

  updateTeamName: (teamId, name) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, name } : team,
      ),
      currentTeam: state.currentTeam?.id === teamId
        ? { ...state.currentTeam, name }
        : state.currentTeam,
    })),

  reorderTeams: (teams) =>
    set({ teams }),

  deleteTeam: (teamId) =>
    set((state) => ({
      teams: state.teams.filter((team) => team.id !== teamId),
      currentTeam: state.currentTeam?.id === teamId ? null : state.currentTeam,
    })),

  // Acciones para el equipo actual
  setCurrentTeam: (teamId) =>
    set((state) => ({
      currentTeam: state.teams.find((team) => team.id === teamId),
    })),

  updateTeamPokemon: (teamId, pokemon) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, pokemon } : team,
      ),
      currentTeam: state.currentTeam?.id === teamId
        ? { ...state.currentTeam, pokemon }
        : state.currentTeam,
    })),

  // Acciones para los borradores
  saveTeamListDraft: (teams) =>
    set({ teamListDraft: teams }),

  saveTeamPokemonDraft: (teamId, pokemon) =>
    set({ teamPokemonDraft: { teamId, pokemon } }),

  discardTeamListDraft: () =>
    set({ teamListDraft: null }),

  discardTeamPokemonDraft: () =>
    set({ teamPokemonDraft: null }),

  restoreTeamListDraft: () =>
    set((state) => ({
      teams: state.teamListDraft || state.teams,
      teamListDraft: null,
    })),

  restoreTeamPokemonDraft: () =>
    set((state) => {
      if (!state.teamPokemonDraft) return state;
      return {
        teams: state.teams.map((team) =>
          team.id === state.teamPokemonDraft.teamId
            ? { ...team, pokemon: state.teamPokemonDraft.pokemon }
            : team,
        ),
        currentTeam: state.currentTeam?.id === state.teamPokemonDraft.teamId
          ? { ...state.currentTeam, pokemon: state.teamPokemonDraft.pokemon }
          : state.currentTeam,
        teamPokemonDraft: null,
      };
    }),

  // Acciones para la batalla
  setBattleTeams: (team1, team2) =>
    set({
      battleState: {
        team1,
        team2,
        isInProgress: false,
        currentRound: 0,
        rounds: [],
        winner: null,
      },
    }),

  startBattle: () =>
    set((state) => ({
      battleState: {
        ...state.battleState,
        isInProgress: true,
      },
    })),

  addBattleRound: (roundResult) =>
    set((state) => ({
      battleState: {
        ...state.battleState,
        rounds: [...state.battleState.rounds, roundResult],
        currentRound: state.battleState.currentRound + 1,
      },
    })),

  endBattle: (winner) =>
    set((state) => ({
      battleState: {
        ...state.battleState,
        isInProgress: false,
        winner,
      },
    })),

  resetBattle: () =>
    set({
      battleState: {
        team1: null,
        team2: null,
        isInProgress: false,
        currentRound: 0,
        rounds: [],
        winner: null,
      },
    }),
}),
);

export default useStore;
