import { useHistory } from 'react-router-dom';
import { AppBar, Link, Toolbar, Typography, Switch, Box } from '@mui/material';
import { CatchingPokemon } from '@mui/icons-material';
import { useAppContext } from '../contexts/AppContext';
import { useThemeContext } from '../contexts/ThemeContext';
import AuthModal from './Auth/AuthModal';
import UserSidebar from './Auth/UserSidebar';

const appbar = {
    backgroundColor: 'custom.main',
    mb: 1,
};

const toolbar = {
    display: 'flex',
    justifyContent: 'space-between',
    height: 75,
    p: 1,
};

const header = {
    p: 1,
    color: 'primary.contrastText',
    textDecoration: 'none',
    '&:hover': {
        color: 'secondary.contrastText',
        borderColor: 'secondary.contrastText',
        borderStyle: 'solid',
        borderSize: 1,
        borderRadius: 8,
        cursor: 'pointer',
    }
};

const title = {
    display: 'flex', 
    alignItems: 'flex-start',
    fontWeight: 'bold',
    px: 1,
};

const pokeball = {
    height: 38,
    width: 38,
};

const thumb = {
    '& .MuiSwitch-thumb': {
        color: 'primary.contrastText',
    },
};

// TODO : Add media query to shrink the title when on mobile
// TODO : Add another AppBar below this one for ApiCredit
const Header = () => {
    const history = useHistory();
    const { theme, setTheme } = useThemeContext();
    const { user } = useAppContext();
    return (
        <AppBar position='static' elevation={2} sx={appbar}>
            <Toolbar sx={toolbar}>
                {user ? <UserSidebar /> : <AuthModal />}
                <Box component={Link} onClick={() => history.push(`/`)} sx={header}>
                    <Typography variant='h4' sx={title}>
                        <CatchingPokemon fontSize='large' sx={pokeball} />nline Pokédex
                    </Typography>
                </Box>
                <Switch
                    checked={theme}
                    onClick={() => setTheme(!theme)}
                    sx={thumb}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;