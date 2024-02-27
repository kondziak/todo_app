import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import "../layout.css";
import SignUpErrorPrinter from './SignUpErrorPrinter';

const SignUpWindowLayer = ({response,loading,open,setOpen}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const goToSignInPage = () => navigate("/sign_in");
    const responseNotEmpty = (response) => response !== null && Object.keys(response).length !== 0;
    
    if (!loading) {
        return (
            <Dialog open={open} fullWidth={true} maxWidth="sm">
                <DialogTitle>User register form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {responseNotEmpty(response) && response.status === 201 && 'Your user account have been created.'}
                        {responseNotEmpty(response) && response.status === 400 && <SignUpErrorPrinter errors={response.data.errors}/>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {   responseNotEmpty(response) && response.status === 201 &&
                        <Button autoFocus onClick={goToSignInPage}>
                            Go to Sign In page
                        </Button>
                    }
                    {
                        responseNotEmpty(response) && response.status === 400 &&
                        <Button autoFocus onClick={setOpen}>
                            Go back to the form
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        );
    } else {
        return (
            <Dialog open={open} fullScreen={fullScreen}>
                <DialogTitle>Waiting ...</DialogTitle>
                <DialogContent className='flex_progress'>
                    <CircularProgress color='secondary' />
                </DialogContent>
            </Dialog>
        );
    }
}

export default SignUpWindowLayer;