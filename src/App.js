import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { queryClient } from './config/queryClient';
import { getTheme } from './config/theme';
import BattleSimulator from './features/battle-simulator/components/BattleSimulator';
import PokemonList from './features/pokemon-list/components/PokemonList';
import TeamBuilder from './features/team-builder/components/TeamBuilder';
import Layout from './shared/layout/Layout';
import useStore from './shared/store/store';

function App() {
  const darkMode = useStore((state) => state.darkMode);
  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Routes>
                <Route path="/" element={<PokemonList showTeamActions={false} />} />
                <Route path="/teams" element={<TeamBuilder />} />
                <Route path="/battle" element={<BattleSimulator />} />
              </Routes>
            </Container>
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
