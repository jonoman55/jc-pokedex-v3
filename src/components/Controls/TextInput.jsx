import { styled, TextField as MuiTextField } from '@mui/material';

const TextField = styled(MuiTextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        color: theme.palette.primary.contrastText,
    },
    '& .MuiFormLabel-root': {
        color: theme.palette.primary.contrastText,
    },
    '& label.Mui-focused': {
        color: theme.palette.custom.main,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.custom.main,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.primary.contrastText,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.custom.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.custom.main,
        },
    },
}));

const TextInput = ({ label, ...other }) => <TextField label={label} {...other} />;

export default TextInput;