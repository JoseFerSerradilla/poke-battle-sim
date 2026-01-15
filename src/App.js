import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

import { queryClient } from './config/queryClient';
import { getTheme } from './config/theme';
import Layout from './shared/layout/Layout';
import useStore from './shared/store/store';

function App() {
  const darkMode = useStore((state) => state.darkMode);
  const theme = React.useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Aquí se añadirán los componentes de las features */}
          </Container>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
