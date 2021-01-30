import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  spacing: 10,
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Ubuntu',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: 'rgb(29, 161, 242)',
      dark: 'rgb(26, 145, 218)',
      light: 'rgb(122, 204, 254)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(29, 161,242,0.1)',
      main: 'rgb(26, 145, 218)',
      dark: 'rgb(21, 32, 43)',
    },
    error: {
      main: 'rgb(224, 36, 94)',
      light: 'rgb(255, 210, 218)',
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#14171a',
    },
  },
  shadows: [],
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
        textTransform: 'none',
        fontSize: 16,
        height: 40,
        fontWeight: 700,
      },
      textPrimary: {
        paddingLeft: 20,
        paddingRight: 20,
      },
      outlinedPrimary: {
        borderColor: 'rgb(29, 161, 243)',
      },
    },
    MuiFilledInput: {
      underline: {
        '&:after': {
          borderBottomWidth: '2px',
        },
        '&:before': {
          borderColor: '#000',
          borderBottomWidth: '2px',
        },
      },
      input: {
        backgroundColor: 'rgb(245, 248, 250)',
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 15,
      },
    },
    MuiDialogActions: {
      root: {
        marginBottom: 8,
      },
    },
    MuiDialogTitle: {
      root: {
        borderBottom: '1px solid rgb(204, 214, 221)',
        marginBottom: 10,
        padding: '10px 15px',
        '& h2': {
          display: 'flex',
          alignItems: 'center',
          fontWeight: 800,
        },
        '& button': {
          padding: 8,
          marginRight: 20,
        },
      },
    },
  },
});

export default theme;
