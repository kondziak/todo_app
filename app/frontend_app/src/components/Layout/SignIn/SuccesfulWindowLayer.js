import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const SuccesfulWindowLayer = ({open}) => {
    const navigate = useNavigate();
    const navigateToNextPage = () => navigate("/main_page");

    return (
        <Dialog open={open} fullWidth={true} maxWidth="sm">
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <DialogContentText>Succesfully logged in</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={navigateToNextPage}>Go to next page</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SuccesfulWindowLayer;