const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokeApi = {
  // Obtener lista de Pokémon con paginación
  getPokemonList: async (limit = 20, offset = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) throw new Error('Error al obtener la lista de Pokémon');
      return await response.json();
    } catch (error) {
      console.error('Error en getPokemonList:', error);
      throw error;
    }
  },

  // Obtener detalles de un Pokémon específico
  getPokemonDetails: async (idOrName) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
      if (!response.ok) throw new Error('Error al obtener detalles del Pokémon');
      return await response.json();
    } catch (error) {
      console.error('Error en getPokemonDetails:', error);
      throw error;
    }
  },

  // Obtener información de una especie Pokémon
  getPokemonSpecies: async (idOrName) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
      if (!response.ok) throw new Error('Error al obtener la especie del Pokémon');
      return await response.json();
    } catch (error) {
      console.error('Error en getPokemonSpecies:', error);
      throw error;
    }
  },

  // Obtener información de un movimiento
  getMoveDetails: async (idOrName) => {
    try {
      const response = await fetch(`${BASE_URL}/move/${idOrName}`);
      if (!response.ok) throw new Error('Error al obtener detalles del movimiento');
      return await response.json();
    } catch (error) {
      console.error('Error en getMoveDetails:', error);
      throw error;
    }
  },

  // Obtener información de una habilidad
  getAbilityDetails: async (idOrName) => {
    try {
      const response = await fetch(`${BASE_URL}/ability/${idOrName}`);
      if (!response.ok) throw new Error('Error al obtener detalles de la habilidad');
      return await response.json();
    } catch (error) {
      console.error('Error en getAbilityDetails:', error);
      throw error;
    }
  },

  // Obtener información de un tipo
  getTypeDetails: async (idOrName) => {
    try {
      const response = await fetch(`${BASE_URL}/type/${idOrName}`);
      if (!response.ok) throw new Error('Error al obtener detalles del tipo');
      return await response.json();
    } catch (error) {
      console.error('Error en getTypeDetails:', error);
      throw error;
    }
  },
};
