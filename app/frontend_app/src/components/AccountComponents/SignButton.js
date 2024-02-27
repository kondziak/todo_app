import Button from '@mui/material/Button';
import {red} from '@mui/material/colors';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

const SignButton = ({text,path}) => {
    const ColorButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[400],
        '&:hover': {
            backgroundColor: red[700],
        },
    }));
    const navigate = useNavigate();
    const push = () => {
        navigate(path);
    }
    return ( <ColorButton variant='contained' size='large' onClick={push} className='account_button'>{text}</ColorButton>);
}


export default SignButton;