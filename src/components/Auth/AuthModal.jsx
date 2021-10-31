import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Backdrop, Box, Modal, Fade, Button, AppBar, Tabs, Tab } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import GoogleButton from 'react-google-button';
import Login from './Login';
import SignUp from './SignUp';

const loginBtn = {
    width: 100,
    borderRadius: 4,
    color: 'primary.contrastText',
    borderColor: 'primary.contrastText',
    '&:hover': {
        color: 'secondary.contrastText',
    },
};

const container = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'primary.light',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'primary.contrastText',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
};

const appbar = {
    bgcolor: 'transparent',
};

const modal = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const tabs = {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    color: 'primary.contrastText',
    '& .MuiTabs-indicator': {
        bgcolor: 'custom.main',
    },
};

const tab = {
    color: 'primary.contrastText',
    '&.Mui-selected': {
        color: 'custom.main',
    },
};

const googleBox = {
    p: 3,
    pt: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 2,
    fontSize: 20
};

const googleBtn = {
    width: '100%',
    outline: 'none',
};

export default function AuthModal() {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => setValue(newValue);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                enqueueSnackbar(
                    `Sign Up Successful. Welcome ${res.user.email}`,
                    { variant: 'success' }
                );
                handleClose();
            })
            .catch((error) => {
                enqueueSnackbar(
                    error.message,
                    { variant: 'error' }
                );
                return;
            });
    };

    return (
        <div>
            <Button variant='outlined' size='large' onClick={handleOpen} sx={loginBtn}>
                Login
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={modal}
            >
                <Fade in={open}>
                    <Box sx={container}>
                        <AppBar position='static' sx={appbar}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant='fullWidth'
                                sx={tabs}
                            >
                                <Tab label='Login' sx={tab} />
                                <Tab label='Sign Up'sx={tab} />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <SignUp handleClose={handleClose} />}
                        <Box sx={googleBox}>
                            <span>OR</span>
                            <GoogleButton
                                style={googleBtn}
                                onClick={signInWithGoogle}
                            />
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};