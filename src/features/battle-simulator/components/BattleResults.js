import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  Paper,
  Alert,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Refresh as RefreshIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';

function BattleResults({ battleResult, team1Name, team2Name, onReset }) {
  const { rounds, winner, team1Stats, team2Stats } = battleResult;

  return (
    <Box>
      {/* Resultado Global */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          background: winner === 1
            ? 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
            : 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <TrophyIcon sx={{ fontSize: 48, mr: 2 }} />
          <Typography variant="h3" component="h1">
            ¡{winner === 1 ? team1Name : team2Name} gana!
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  {team1Name}
                </Typography>
                <Typography variant="h6" color="success.main">
                  ✓ {team1Stats.alive} Pokémon con vida
                </Typography>
                <Typography variant="h6" color="error.main">
                  ✗ {team1Stats.defeated} Pokémon debilitados
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="secondary">
                  {team2Name}
                </Typography>
                <Typography variant="h6" color="success.main">
                  ✓ {team2Stats.alive} Pokémon con vida
                </Typography>
                <Typography variant="h6" color="error.main">
                  ✗ {team2Stats.defeated} Pokémon debilitados
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Título de Rondas */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Historial de Combates ({rounds.length} rondas)
      </Typography>

      {/* Detalle de cada ronda */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {rounds.map((round, index) => (
          <Card
            key={index}
            elevation={2}
            sx={{
              border: '2px solid',
              borderColor: round.winner.id === round.pokemon1.id ? 'primary.main' : 'secondary.main',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={`Ronda ${round.roundNumber}`}
                  color="default"
                  sx={{ mr: 2 }}
                />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Combate
                </Typography>
              </Box>

              {/* Pokémon enfrentados */}
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={5}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: round.winner.id === round.pokemon1.id ? 'success.light' : 'grey.200',
                      border: round.winner.id === round.pokemon1.id ? '2px solid' : 'none',
                      borderColor: 'success.main',
                    }}
                  >
                    <Box
                      component="img"
                      src={round.pokemon1.sprite}
                      alt={round.pokemon1.name}
                      sx={{ width: 80, height: 80, mb: 1 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: round.winner.id === round.pokemon1.id ? 'bold' : 'normal',
                      }}
                    >
                      {round.pokemon1.name}
                      {round.winner.id === round.pokemon1.id && ' 🏆'}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" display="block">
                        Ataque: {round.stats[round.pokemon1.name].attack}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Defensa: {round.stats[round.pokemon1.name].defense}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Velocidad: {round.stats[round.pokemon1.name].speed}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="text.secondary">
                    VS
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: round.winner.id === round.pokemon2.id ? 'success.light' : 'grey.200',
                      border: round.winner.id === round.pokemon2.id ? '2px solid' : 'none',
                      borderColor: 'success.main',
                    }}
                  >
                    <Box
                      component="img"
                      src={round.pokemon2.sprite}
                      alt={round.pokemon2.name}
                      sx={{ width: 80, height: 80, mb: 1 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: round.winner.id === round.pokemon2.id ? 'bold' : 'normal',
                      }}
                    >
                      {round.pokemon2.name}
                      {round.winner.id === round.pokemon2.id && ' 🏆'}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" display="block">
                        Ataque: {round.stats[round.pokemon2.name].attack}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Defensa: {round.stats[round.pokemon2.name].defense}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Velocidad: {round.stats[round.pokemon2.name].speed}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Resultado y explicación */}
              <Alert
                severity="info"
                icon={<ArrowIcon />}
                sx={{
                  '& .MuiAlert-message': { width: '100%' },
                }}
              >
                <Typography variant="body2">
                  <strong>Resultado:</strong> {round.reason}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Botón para nueva batalla */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<RefreshIcon />}
          onClick={onReset}
          sx={{
            bgcolor: '#dc004e',
            '&:hover': { bgcolor: '#b71c1c' },
            px: 6,
            py: 1.5,
          }}
        >
          Nueva Batalla
        </Button>
      </Box>
    </Box>
  );
}

export default BattleResults;
