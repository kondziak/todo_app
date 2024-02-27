import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const SignInWindowLayer = ({open,close,text}) => {
    return (
        <Dialog open={open} fullWidth={true} maxWidth="sm">
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SignInWindowLayer;