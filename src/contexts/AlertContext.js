import { createRef } from 'react';
import { Slide, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SnackbarProvider } from 'notistack';

export const AlertProvider = ({ children }) => {
    const notistackRef = createRef();
    const onClickDismiss = key => () => {
        notistackRef.current.closeSnackbar(key);
    };
    return (
        <SnackbarProvider
            ref={notistackRef}
            maxSnack={3}
            autoHideDuration={3000}
            preventDuplicate
            TransitionComponent={Slide}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            action={(key) => (
                <IconButton size='small' onClick={onClickDismiss(key)}>
                    <Close fontSize='small' sx={{ color: 'custom.light' }} />
                </IconButton>
            )}
        >
            {children}
        </SnackbarProvider>
    );
};