import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Undo as UndoIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import useStore from '../../../shared/store/store';
import PokemonSelector from './PokemonSelector';

function TeamBuilder() {
  const {
    teams,
    currentTeam,
    createTeam,
    updateTeamName,
    deleteTeam,
    setCurrentTeam,
    updateTeamPokemon,
    teamPokemonDraft,
    saveTeamPokemonDraft,
    discardTeamPokemonDraft,
    restoreTeamPokemonDraft,
  } = useStore();

  const [newTeamName, setNewTeamName] = useState('');
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editingTeamName, setEditingTeamName] = useState('');
  const [selectorOpen, setSelectorOpen] = useState(false);

  const handleCreateTeam = () => {
    const trimmedName = newTeamName.trim();
    if (trimmedName) {
      createTeam(trimmedName);
      setNewTeamName('');
    }
  };

  const handleStartEditTeam = (team) => {
    setEditingTeamId(team.id);
    setEditingTeamName(team.name);
  };

  const handleSaveTeamName = () => {
    if (editingTeamName.trim()) {
      updateTeamName(editingTeamId, editingTeamName.trim());
      setEditingTeamId(null);
      setEditingTeamName('');
    }
  };

  const handlePokemonDragEnd = (result) => {
    if (!result.destination || !currentTeam) return;

    const items = Array.from(currentTeam.pokemon);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTeamPokemon(currentTeam.id, items);
    saveTeamPokemonDraft(currentTeam.id, items);
  };

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      {/* Lista de equipos */}
      <Box sx={{ width: 300 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Tus Equipos</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Nombre del equipo"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateTeam()}
            sx={{ mb: 1 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateTeam}
            disabled={!newTeamName.trim()}
            color="error"
            sx={{ height: 40, bgcolor: '#dc004e', '&:hover': { bgcolor: '#b71c1c' } }}
          >
            Crear Equipo
          </Button>
        </Box>

        <Box sx={{ minHeight: 200 }}>
          {teams.map((team) => (
            <Card key={team.id} sx={{ mb: 1 }}>
              <CardContent sx={{
                display: 'flex',
                alignItems: 'center',
                py: '8px !important',
              }}>
                <Box sx={{ flexGrow: 1 }}>
                  {editingTeamId === team.id ? (
                    <TextField
                      size="small"
                      value={editingTeamName}
                      onChange={(e) => setEditingTeamName(e.target.value)}
                      onBlur={handleSaveTeamName}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveTeamName()}
                      autoFocus
                    />
                  ) : (
                    <Typography
                      sx={{
                        cursor: 'pointer',
                        fontWeight: currentTeam?.id === team.id ? 'bold' : 'normal',
                      }}
                      onClick={() => setCurrentTeam(team.id)}
                    >
                      {team.name}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {team.pokemon.length}/6 Pokémon
                  </Typography>
                </Box>
                <Stack direction="row">
                  <IconButton
                    size="small"
                    onClick={() => handleStartEditTeam(team)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => deleteTeam(team.id)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Detalle del equipo */}
      <Box sx={{ flex: 1 }}>
        {currentTeam ? (
          <>
            <Box sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Typography variant="h5">
                {currentTeam.name} ({currentTeam.pokemon.length}/6)
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  onClick={restoreTeamPokemonDraft}
                  disabled={!teamPokemonDraft || teamPokemonDraft.teamId !== currentTeam.id}
                  startIcon={<UndoIcon />}
                >
                  Deshacer
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={discardTeamPokemonDraft}
                  disabled={!teamPokemonDraft || teamPokemonDraft.teamId !== currentTeam.id}
                  startIcon={<SaveIcon />}
                >
                  Guardar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => setSelectorOpen(true)}
                  disabled={currentTeam.pokemon.length >= 6}
                >
                  Añadir Pokémon
                </Button>
              </Stack>
            </Box>

            <DragDropContext onDragEnd={handlePokemonDragEnd}>
              <Droppable
                droppableId="pokemon"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
              >
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ minHeight: 200 }}
                  >
                    {currentTeam.pokemon.map((pokemon, index) => (
                      <Draggable
                        key={`pokemon-${pokemon.id}`}
                        draggableId={`pokemon-${pokemon.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ mb: 1 }}
                          >
                            <CardContent sx={{
                              display: 'flex',
                              alignItems: 'center',
                              py: '8px !important',
                            }}>
                              <Box
                                component="img"
                                src={pokemon.sprite}
                                alt={pokemon.name}
                                sx={{ width: 50, height: 50, mr: 2 }}
                              />
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ textTransform: 'capitalize' }}>
                                  {pokemon.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Ataque: {pokemon.stats.attack}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => {
                                  const newPokemon = currentTeam.pokemon.filter(
                                    (p) => p.id !== pokemon.id,
                                  );
                                  updateTeamPokemon(currentTeam.id, newPokemon);
                                  saveTeamPokemonDraft(currentTeam.id, newPokemon);
                                }}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
            Selecciona un equipo o crea uno nuevo
          </Typography>
        )}
      </Box>
      <PokemonSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={(pokemon) => {
          const newPokemon = [...currentTeam.pokemon, pokemon];
          updateTeamPokemon(currentTeam.id, newPokemon);
          saveTeamPokemonDraft(currentTeam.id, newPokemon);
        }}
        currentTeam={currentTeam}
      />
    </Box>
  );
}

export default TeamBuilder;
