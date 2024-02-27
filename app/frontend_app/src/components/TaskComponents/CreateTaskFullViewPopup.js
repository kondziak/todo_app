import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch} from "react-redux";
import { deleteUserTask } from "../../reducers/userReducer";
import { useCallback } from "react";

const CreateTaskFullViewPopup = ({open,handleClose,task,user}) => {
    const dispatch = useDispatch();
    const startDate = new Date(task.creationDate);
    const finishDate = new Date(task.finishDate);

    const formatDate = (date) => {
        return date.toLocaleString("en-GB");
    };

    const deleteTaskData = useCallback(async () => {
        dispatch(deleteUserTask({id: user.id, task: task}));
    },[dispatch,task,user.id]);

    const deleteTask = async () => {
        await deleteTaskData()
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseIcon color="primary"></CloseIcon>
                    </IconButton>
                </DialogTitle>
                <DialogContent className="task_content">
                    <Typography variant="h6">Title: {task.title}</Typography>
                    <Typography variant="h6">Description: {task.description}</Typography>
                    <Typography variant="h6">Start time: {formatDate(startDate)}</Typography>
                    <Typography variant="h6">Finish time: {formatDate(finishDate)}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" size="medium" onClick={handleClose}>Close</Button>
                    <Button variant="contained" color="error" size="medium" onClick={deleteTask}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateTaskFullViewPopup;