import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';
import OutlinedButton from '../Controls/OutlinedButton';
import TextInput from '../Controls/TextInput';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase';

const SignUp = ({ handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            enqueueSnackbar(
                'Passwords do no match',
                { variant: 'error' }
            );
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            enqueueSnackbar(
                `Sign Up Successful. Welcome ${result.user.email}`,
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
            <TextInput
                type='password'
                label='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <OutlinedButton
                text='Sign Up'
                size='large'
                onClick={handleSubmit}
            />
        </Box>
    );
};

export default SignUp;