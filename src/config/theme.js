import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#DC0A2D', // Color rojo característico de Pokémon
      light: '#FF5252',
      dark: '#B71C1C',
    },
    secondary: {
      main: '#3B4CCA', // Color azul característico de Pokémon
      light: '#5C6BC0',
      dark: '#303F9F',
    },
    error: {
      main: mode === 'light' ? '#d32f2f' : '#f44336',
    },
    warning: {
      main: mode === 'light' ? '#ed6c02' : '#ff9800',
    },
    info: {
      main: mode === 'light' ? '#0288d1' : '#29b6f6',
    },
    success: {
      main: mode === 'light' ? '#2e7d32' : '#66bb6a',
    },
    background: {
      default: mode === 'light' ? '#F5F5F5' : '#0a0a0a',
      paper: mode === 'light' ? '#FFFFFF' : '#1a1a1a',
    },
    text: {
      primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.95)',
      secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: mode === 'light'
            ? '0 2px 4px rgba(0, 0, 0, 0.1)'
            : '0 2px 8px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 4px 8px rgba(0, 0, 0, 0.15)'
              : '0 4px 12px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light'
            ? '0 4px 6px rgba(0, 0, 0, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.5)',
          backgroundImage: 'none',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        },
        elevation1: {
          boxShadow: mode === 'light'
            ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
            : '0px 2px 8px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: mode === 'light'
            ? '0 2px 4px rgba(0, 0, 0, 0.1)'
            : '0 2px 8px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: mode === 'dark' ? '#DC0A2D' : '#DC0A2D',
            },
          },
          '& .MuiInputLabel-root': {
            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardError: {
          backgroundColor: mode === 'dark' ? 'rgba(211, 47, 47, 0.2)' : undefined,
          border: mode === 'dark' ? '1px solid rgba(211, 47, 47, 0.5)' : undefined,
        },
        standardWarning: {
          backgroundColor: mode === 'dark' ? 'rgba(237, 108, 2, 0.2)' : undefined,
          border: mode === 'dark' ? '1px solid rgba(237, 108, 2, 0.5)' : undefined,
        },
        standardInfo: {
          backgroundColor: mode === 'dark' ? 'rgba(2, 136, 209, 0.2)' : undefined,
          border: mode === 'dark' ? '1px solid rgba(2, 136, 209, 0.5)' : undefined,
        },
        standardSuccess: {
          backgroundColor: mode === 'dark' ? 'rgba(46, 125, 50, 0.2)' : undefined,
          border: mode === 'dark' ? '1px solid rgba(46, 125, 50, 0.5)' : undefined,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          boxShadow: mode === 'light'
            ? '0 8px 16px rgba(0, 0, 0, 0.15)'
            : '0 8px 24px rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: mode === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'dark' ? '#424242' : '#616161',
          fontSize: '0.875rem',
        },
      },
    },
  },
});

export { getTheme };
