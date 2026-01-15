import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useStore from '../store/store';

const ROUTES = [
  { name: 'Lista Pokémon', path: '/' },
  { name: 'Constructor de Equipo', path: '/teams' },
  { name: 'Simulador de Batalla', path: '/battle' },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { darkMode, toggleDarkMode } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Title - Desktop */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            POKE BATTLE
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {ROUTES.map((route) => (
                <MenuItem
                  key={route.path}
                  onClick={() => handleNavigate(route.path)}
                  selected={location.pathname === route.path}
                >
                  <Typography textAlign="center">{route.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo/Title - Mobile */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            POKE BATTLE
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {ROUTES.map((route) => (
              <Typography
                key={route.path}
                onClick={() => handleNavigate(route.path)}
                sx={{
                  mx: 2,
                  color: 'white',
                  cursor: 'pointer',
                  borderBottom: location.pathname === route.path ? '2px solid white' : 'none',
                }}
              >
                {route.name}
              </Typography>
            ))}
          </Box>

          {/* Theme toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                color="default"
              />
            }
            label={darkMode ? '🌙' : '☀️'}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
