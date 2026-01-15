import { Box } from '@mui/material';
import React from 'react';

import Footer from './Footer';
import Header from './Header';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
