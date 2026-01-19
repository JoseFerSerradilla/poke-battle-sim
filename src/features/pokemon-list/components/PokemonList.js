import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { pokeApi } from '../../../shared/services/pokeApi';
import useStore from '../../../shared/store/store';

import PokemonCard from './PokemonCard';
import SearchFilters from './SearchFilters';

function PokemonList({ showTeamActions = false }) {
  const navigate = useNavigate();
  const { teams, currentTeam, updateTeamPokemon, saveTeamPokemonDraft } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      // Obtener lista inicial
      const list = await pokeApi.getPokemonList(151, 0);

      // Obtener detalles de todos los Pokémon
      const detailsPromises = list.results.map(pokemon =>
        pokeApi.getPokemonDetails(pokemon.name)
      );

      const allDetails = await Promise.all(detailsPromises);

      // Transformar a formato consistente
      return allDetails.map(details => ({
        id: details.id,
        name: details.name,
        types: details.types.map(t => t.type.name),
        sprite: details.sprites.front_default,
        stats: details.stats.reduce((acc, stat) => ({
          ...acc,
          [stat.stat.name]: stat.base_stat,
        }), {}),
      }));
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });

  const filteredPokemon = useMemo(() => {
    if (!data) return [];

    return data.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTypes = selectedTypes.length === 0 ||
        selectedTypes.some(selectedType => pokemon.types.includes(selectedType));
      return matchesSearch && matchesTypes;
    });
  }, [data, searchTerm, selectedTypes]);

  const handleAddToTeam = (pokemon) => {
    if (!currentTeam) {
      navigate('/teams');
      return;
    }

    if (currentTeam.pokemon.length >= 6) {
      return;
    }

    const updatedPokemon = [...currentTeam.pokemon, pokemon];
    updateTeamPokemon(currentTeam.id, updatedPokemon);
    saveTeamPokemonDraft(currentTeam.id, updatedPokemon);
  };

  if (isLoading) {
    return <Typography>Cargando Pokémon...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error al cargar la lista de Pokémon</Typography>;
  }

  return (
    <Box>
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
      />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          mt: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onAddToTeam={handleAddToTeam}
            isInTeam={currentTeam?.pokemon.some((p) => p.name === pokemon.name)}
            canAddToTeam={currentTeam && currentTeam.pokemon.length < 6}
            showTeamActions={showTeamActions}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PokemonList;
