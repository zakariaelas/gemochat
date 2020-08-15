import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core';

let theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: 'hsl(247, 67%, 59%)',
      dark: 'hsl(247, 68%, 54%)',
      darkBlue: 'hsl(246, 65%, 9%)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'hsl(247, 68%, 90%)',
      main: 'rgb(143, 131, 239)',
    },
    blueGrey: {
      50: 'hsl(210, 36%, 96%)',
      100: 'hsl(212, 33%, 89%)',
      200: 'hsl(210, 31%, 80%)',
      300: 'hsl(211, 27%, 70%)',
      400: 'hsl(209, 23%, 60%)',
      500: 'hsl(210, 22%, 49%)',
      600: 'hsl(209, 28%, 39%)',
      700: 'hsl(209, 34%, 30%)',
      800: 'hsl(211, 39%, 23%)',
      900: 'hsl(209, 61%, 16%)',
    },
  },
  spacing: 16,
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '700',
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '700',
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '700',
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '700',
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '700',
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '700',
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      body: {
        backgroundColor: theme.palette.blueGrey[50],
      },
    },
  },
  MuiIconButton: {
    sizeSmall: {
      padding: theme.spacing(0.5),
    },
  },
  MuiFormHelperText: {
    root: {
      '&$error': {
        marginLeft: 0,
        fontWeight: 500,
      },
    },
    error: {},
  },
  MUIRichTextEditor: {
    root: {
      height: '100%',
    },
    toolbar: {
      padding: theme.spacing(0.25),
      borderBottom: `1px solid ${theme.palette.blueGrey[100]}`,
      backgroundColor: theme.palette.blueGrey[50],
    },
    container: {
      height: '100%',
      marginTop: 0,
      border: `1px solid ${theme.palette.blueGrey[100]}`,
    },
    editorContainer: {
      margin: 0,
      padding: '18.5px 14px',
    },
    placeHolder: {
      height: '100%',
      position: 'static',
    },
  },
};

theme = responsiveFontSizes(theme);

export default theme;
