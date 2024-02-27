import './tasksheet.css';
import CreateTaskFullViewPopup from './CreateTaskFullViewPopup';
import { useState } from 'react';

const TaskComponent = ({task,user}) => {

    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const displayTask = (event,task,user) => {
        event.preventDefault();
        handleOpen();
    }
    
    return (
        <>
        <div className="sticky_task" key={task.id} onClick={ (event) => displayTask(event, task, user)}>
            <p className="task_title">{task.title}</p>
            <span className="task_description">{task.description}</span>
        </div>
        <CreateTaskFullViewPopup open={open} handleClose={handleClose} task={task} user={user} />
        </>
    );
}

export default TaskComponent;