import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { getTypeColor } from '../../../features/pokemon-list/utils/typeColors';
import { pokeApi } from '../../../shared/services/pokeApi';

function PokemonOption({ option, ...props }) {
  const { data, isLoading } = useQuery({
    queryKey: ['pokemonDetails', option.name],
    queryFn: () => pokeApi.getPokemonDetails(option.name),
  });

  if (isLoading || !data) {
    return (
      <Box component="li" {...props} sx={{ p: 1 }}>
        {option.name}
      </Box>
    );
  }

  return (
    <Box component="li" {...props} sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src={data.sprites.front_default}
        alt={option.name}
        sx={{ width: 30, height: 30 }}
      />
      <Typography sx={{ textTransform: 'capitalize' }}>
        {option.name}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {data.types.map((type) => (
        <Chip
          key={type.type.name}
          label={type.type.name}
          size="small"
          sx={{
            bgcolor: getTypeColor(type.type.name),
            color: 'white',
            textTransform: 'capitalize',
          }}
        />
      ))}
    </Box>
  );
}

function PokemonSelector({ open, onClose, onSelect, currentTeam }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { data: pokemonList } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => pokeApi.getPokemonList(151, 0),
  });

  const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['pokemonDetails', selectedPokemon?.name],
    queryFn: () => (selectedPokemon ? pokeApi.getPokemonDetails(selectedPokemon.name) : null),
    enabled: !!selectedPokemon,
  });

  const handleSelect = () => {
    if (selectedPokemon && pokemonDetails) {
      onSelect({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        types: pokemonDetails.types.map((t) => t.type.name),
        sprite: pokemonDetails.sprites.front_default,
        stats: pokemonDetails.stats.reduce(
          (acc, stat) => ({
            ...acc,
            [stat.stat.name]: stat.base_stat,
          }),
          {},
        ),
      });
      setSelectedPokemon(null);
      onClose();
    }
  };

  const availablePokemon = pokemonList?.results.filter(
    (pokemon) => !currentTeam?.pokemon.some((p) => p.name === pokemon.name),
  ) || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Añadir Pokémon al Equipo</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Autocomplete
            value={selectedPokemon}
            onChange={(_, newValue) => setSelectedPokemon(newValue)}
            options={availablePokemon}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Selecciona un Pokémon" />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {option.name}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Chip
                  label="Grass"
                  size="small"
                  sx={{
                    bgcolor: getTypeColor('grass'),
                    color: 'white',
                    textTransform: 'capitalize',
                  }}
                />
              </Box>
            )}
            isOptionEqualToValue={(option, value) => option.name === value.name}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSelect}
          disabled={!selectedPokemon || currentTeam?.pokemon.length >= 6}
          variant="contained"
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PokemonSelector;
