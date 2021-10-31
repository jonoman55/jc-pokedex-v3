import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';
import OutlinedButton from '../Controls/OutlinedButton';
import TextInput from '../Controls/TextInput';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase';

const Login = ({ handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (!email || !password) {
            enqueueSnackbar(
                'Please fill all the fields',
                { variant: 'error' }
            );
            return;
        }
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            enqueueSnackbar(
                `Login Successful. Welcome ${result.user.email}`,
                { variant: 'success' }
            );
            handleClose();
        } catch (error) {
            enqueueSnackbar(
                error.message,
                { variant: 'error' }
            );
            return;
        }
    };

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: '20px ' }}>
            <TextInput
                type='email'
                label='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextInput
                type='password'
                label='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <OutlinedButton
                size='large'
                text='Login'
                onClick={handleSubmit}
            />
        </Box>
    );
};
export default Login;