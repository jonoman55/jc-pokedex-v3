import { styled, Button as MuiButton } from '@mui/material';

const Button = styled(MuiButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.custom.main,
    borderRadius: '5px',
    '&:hover': {
        borderColor: theme.palette.custom.main,
        backgroundColor: theme.palette.primary.main,
    },
}));

const OutlinedButton = ({ text, onClick, ...other }) => (
    <Button variant="outlined" onClick={onClick} {...other}>
        {text}
    </Button>
);

export default OutlinedButton;