import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { pokeApi } from '../../../shared/services/pokeApi';
import { getTypeColor } from '../utils/typeColors';

function PokemonCard({ pokemon, onAddToTeam, isInTeam, canAddToTeam, showTeamActions = true }) {
  const { data, isLoading } = useQuery({
    queryKey: ['pokemonDetails', pokemon.name],
    queryFn: () => pokeApi.getPokemonDetails(pokemon.name),
  });

  if (isLoading) {
    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const handleAddToTeam = () => {
    if (canAddToTeam && !isInTeam) {
      onAddToTeam({
        id: data.id,
        name: data.name,
        types: data.types.map((t) => t.type.name),
        sprite: data.sprites.front_default,
        stats: data.stats.reduce((acc, stat) => ({
          ...acc,
          [stat.stat.name]: stat.base_stat,
        }), {}),
      });
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={data.sprites.front_default}
        alt={pokemon.name}
        sx={{ objectFit: 'contain', bgcolor: 'background.paper' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textTransform: 'capitalize' }}
        >
          {pokemon.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2">
            Ataque: {data.stats.find((stat) => stat.stat.name === 'attack')?.base_stat}
          </Typography>
          <Typography variant="body2">
            Defensa: {data.stats.find((stat) => stat.stat.name === 'defense')?.base_stat}
          </Typography>
        </Box>
      </CardContent>
      {showTeamActions && (
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddToTeam}
            disabled={!canAddToTeam || isInTeam}
          >
            {isInTeam
              ? 'Ya en el equipo'
              : canAddToTeam
                ? 'Añadir al equipo'
                : 'Selecciona un equipo'
            }
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default PokemonCard;
