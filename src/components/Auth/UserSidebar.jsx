import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Drawer, Avatar, Button, Box } from '@mui/material';
import { AiFillDelete } from 'react-icons/ai';
import { signOut } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../../firebase';
import { useAppContext } from '../../contexts/AppContext';

const container = {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
};

const avatar = {
    height: 38,
    width: 38,
    cursor: 'pointer',
    bgcolor: 'custom.main'
};

const picture = {
    width: 200,
    height: 200,
    cursor: "pointer",
    bgcolor: "custom.main",
    objectFit: "contain",
};

const logout = {
    height: "8%",
    width: "100%",
    bgcolor: "custom.main",
    marginTop: 20,
};

const profile = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
};

const username = {
    width: '100%',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bolder',
    wordWrap: 'break-word',
};

const favs = {
    fontSize: 15,
    textShadow: '0 0 5px black',
};

const pokes = {
    padding: 10,
    borderRadius: 5,
    color: "custom.dark",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "custom.main",
    boxShadow: "0 0 3px black",
};

export default function UserSidebar() {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const { user, pokeList, favorites } = useAppContext();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const logOut = () => {
        signOut(auth);
        enqueueSnackbar(
            'Logout Successful!',
            { variant: 'success' }
        );
        toggleDrawer();
    };

    const removeFromFavorites = async (pokemon) => {
        const coinRef = doc(db, 'favorites', user.uid);
        try {
            await setDoc(
                coinRef,
                { pokemon: favorites.filter((wish) => wish !== pokemon?.id) },
                { merge: true }
            );
            enqueueSnackbar(
                `${pokemon.name} removed from Favorites!`,
                { variant: 'success' }
            );
        } catch (error) {
            enqueueSnackbar(
                error.message,
                { variant: 'error' }
            );
        }
    };

    return (
        <>
            <Avatar
                onClick={toggleDrawer(true)}
                src={user.photoURL}
                alt={user.displayName || user.email}
                sx={avatar}
            />
            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
            >
                <div style={container}>
                    <div style={profile}>
                        <Avatar
                            src={user.photoURL}
                            alt={user.displayName || user.email}
                            sx={picture}
                        />
                        <span style={username}>
                            {user.displayName || user.email}
                        </span>
                        <div>
                            <span style={favs}>
                                Favorites ⭐
                            </span>
                            {/* eslint-disable-next-line */}
                            {pokeList && pokeList?.map((pokemon, idx) => {
                                if (favorites.includes(pokemon.id)) {
                                    return (
                                        // TODO : Convert div to a Link Button and use history.push(`/coins/${coin.id}`) to go to it's CoinPage
                                        <Box component='div' key={idx} sx={pokes}>
                                            <span>{pokemon.name}</span>
                                            <span style={{ display: 'flex', gap: 8 }}>
                                                {pokemon.name}
                                                <AiFillDelete
                                                    style={{ cursor: 'pointer' }}
                                                    fontSize='16'
                                                    onClick={() => removeFromFavorites(pokemon)}
                                                />
                                            </span>
                                        </Box>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <Button variant='contained' size='large' onClick={logOut} sx={logout}>
                        Log Out
                    </Button>
                </div>
            </Drawer>
        </>
    );
};