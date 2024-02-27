import React, {useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import {IconButton} from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask';
import CreateTaskPopup from '../TaskComponents/CreateTaskPopup';

const GetUserTasksComponent = (userId) => {
    const [open,updateOpen] = useState(false);
    const handleOpen = () => {
        updateOpen(true);
    }
    const handleClose = () => {
        updateOpen(false);
    }
    return (
        <>
            <Tooltip title="Add task">
                <IconButton type="button" onClick={handleOpen}>
                    <AddTaskIcon style={{color:"white"}}>
                    </AddTaskIcon>
                </IconButton>
            </Tooltip> 
            <CreateTaskPopup open={open} handleClose={handleClose} userId={userId}/>
        </>
    );
}
export default GetUserTasksComponent;