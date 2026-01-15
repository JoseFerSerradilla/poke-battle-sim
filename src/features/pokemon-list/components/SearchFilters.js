import {
  Autocomplete,
  Box,
  Paper,
  TextField,
} from '@mui/material';
import React from 'react';

import { typeColors } from '../utils/typeColors';

const POKEMON_TYPES = Object.keys(typeColors);

function SearchFilters({ searchTerm, onSearchChange, selectedTypes, onTypesChange }) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <TextField
          fullWidth
          label="Buscar Pokémon"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Autocomplete
          multiple
          options={POKEMON_TYPES}
          value={selectedTypes}
          onChange={(_, newValue) => onTypesChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrar por tipo"
              variant="outlined"
            />
          )}
          sx={{ flex: 1 }}
        />
      </Box>
    </Paper>
  );
}

export default SearchFilters;
