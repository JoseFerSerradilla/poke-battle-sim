import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Grid,
  Chip,
} from '@mui/material';
import { SportsKabaddi as BattleIcon } from '@mui/icons-material';
import useStore from '../../../shared/store/store';

function TeamSelector({ onStartBattle }) {
  const teams = useStore((state) => state.teams);
  const [team1Id, setTeam1Id] = React.useState('');
  const [team2Id, setTeam2Id] = React.useState('');

  const team1 = teams.find((t) => t.id === team1Id);
  const team2 = teams.find((t) => t.id === team2Id);

  const canStartBattle =
    team1Id &&
    team2Id &&
    team1Id !== team2Id &&
    team1?.pokemon.length > 0 &&
    team2?.pokemon.length > 0;

  const handleStartBattle = () => {
    if (canStartBattle) {
      onStartBattle(team1, team2);
    }
  };

  const renderTeamPreview = (team, teamNumber) => {
    if (!team) return null;

    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {team.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {team.pokemon.length} Pokémon
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {team.pokemon.map((pokemon, index) => (
              <Box
                key={pokemon.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 80,
                }}
              >
                <Chip
                  label={`#${index + 1}`}
                  size="small"
                  color={teamNumber === 1 ? 'primary' : 'secondary'}
                  sx={{ mb: 0.5 }}
                />
                <Box
                  component="img"
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  sx={{ width: 60, height: 60 }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    fontSize: '0.7rem',
                  }}
                >
                  {pokemon.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                  Atq: {pokemon.stats.attack} | Def: {pokemon.stats.defense} | Vel: {pokemon.stats.speed}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Simulador de Batalla
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Selecciona dos equipos para iniciar un combate Pokémon
      </Typography>

      {teams.length < 2 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Necesitas al menos 2 equipos con Pokémon para iniciar una batalla.
          Ve a la sección de "Equipos" para crear tus equipos.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Equipo 1</InputLabel>
            <Select
              value={team1Id}
              label="Equipo 1"
              onChange={(e) => setTeam1Id(e.target.value)}
            >
              <MenuItem value="">
                <em>Selecciona un equipo</em>
              </MenuItem>
              {teams
                .filter((team) => team.pokemon.length > 0)
                .map((team) => (
                  <MenuItem key={team.id} value={team.id} disabled={team.id === team2Id}>
                    {team.name} ({team.pokemon.length} Pokémon)
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {renderTeamPreview(team1, 1)}
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Equipo 2</InputLabel>
            <Select
              value={team2Id}
              label="Equipo 2"
              onChange={(e) => setTeam2Id(e.target.value)}
            >
              <MenuItem value="">
                <em>Selecciona un equipo</em>
              </MenuItem>
              {teams
                .filter((team) => team.pokemon.length > 0)
                .map((team) => (
                  <MenuItem key={team.id} value={team.id} disabled={team.id === team1Id}>
                    {team.name} ({team.pokemon.length} Pokémon)
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {renderTeamPreview(team2, 2)}
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<BattleIcon />}
          onClick={handleStartBattle}
          disabled={!canStartBattle}
          sx={{
            bgcolor: '#dc004e',
            '&:hover': { bgcolor: '#b71c1c' },
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
          }}
        >
          ¡Pelear!
        </Button>
      </Box>
    </Box>
  );
}

export default TeamSelector;
