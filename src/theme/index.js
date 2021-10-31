// Theme color palettes - https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=ECEFF1&secondary.color=212121

const custom = {
  main: '#FF0000',
  light: '#fff',
  dark: '#000',
  disabled: 'rgba(0, 0, 0, 0.26)',
  divider: '#484848',
  error: '#d32f2f'
};
  
const scrollBody = {
  scrollbarColor: "#6b6b6b #2b2b2b",
  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    backgroundColor: "#2b2b2b",
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: "#6b6b6b",
    minHeight: 24,
    border: "3px solid #2b2b2b",
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: "#2b2b2b",
  },
};

// MUIv5 themes
export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#eceff1',
      light: '#ffffff',
      dark: '#babdbe',
      contrastText: '#000',
    },
    secondary: {
      main: '#212121',
      light: '#484848',
      dark: '#000000',
      contrastText: '#fff',
    },
    custom: custom,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: scrollBody,
      },
    },
  },
};
  
export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
      light: '#484848',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#eceff1',
      light: '#ffffff',
      dark: '#babdbe',
      contrastText: '#000',
    },
    custom: custom,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: scrollBody,
      },
    },
  },
};