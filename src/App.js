import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, Box, ThemeProvider, CssBaseline } from '@mui/material';
import { AlertProvider } from './contexts/AlertContext';
import { useThemeContext } from './contexts/ThemeContext';
import { light, dark } from './theme';
import Header from './components/Header';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';

const container = {
    minHeight: '100vh',
    backgroundColor: 'primary.main',
    height: '100%',
    width: '100%'
};

// TODO : Implement styled components project wide
const App = () => {
    const { theme } = useThemeContext();
    const activeTheme = createTheme(theme ? light : dark);
    return (
        <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <AlertProvider>
                <Router>
                    <Box sx={container}>
                        <Header />
                        <Switch>
                            <Route path='/' component={Home} exact />
                            <Route path='/pokemon/:id' component={Pokemon} exact />
                        </Switch>
                    </Box>
                </Router>
            </AlertProvider>
        </ThemeProvider>
    );
};

export default App;