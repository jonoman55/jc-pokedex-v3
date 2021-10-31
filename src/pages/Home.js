import { Container, Box, Typography } from '@mui/material';
import { useAppContext } from '../contexts/AppContext';

// TODO : Add Gen Select 
// TODO : Implement Pokedex Viewer
const Home = () => {
    const { pokeList } = useAppContext();

    console.log(pokeList);

    return (
        <Container>
            <Box>
                <Typography sx={{ color: 'primary.contrastText' }}>
                    Home
                </Typography>
            </Box>
        </Container>
    );
}

export default Home;