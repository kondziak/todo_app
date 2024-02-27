import CloseIcon from '@mui/icons-material/Close';
import {Button, IconButton, Stack, TextField, ThemeProvider, Typography, createTheme} from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from'@mui/x-date-pickers/AdapterDayjs';
import { addUserTask } from '../../reducers/userReducer';
import { useState} from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import "./tasksheet.css";

const CreateTaskPopup = ({open,handleClose,userId}) => {

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        title : Yup.string().required('Title is required')
            .min(6,'Title must have at least 6 characters')
            .max(20,'Title cannot exceed 20 characters'),
        description : Yup.string().required('Description is required')
            .min(15,'Description must have at least 15 characters')
            .max(40,'Description cannot exceed 40 characers'),
        finishTaskDate : Yup.string().required('Finish task date is required')
    });

    const [taskFinishDateTime,setTaskFinishDateTime] = useState(dayjs(new Date()));

    const createTaskEntry = (data) => {
        return {
            title : data.title,
            description : data.description,
            creationDate : dayjs(new Date()),
            finishDate : dayjs(data.finishTaskDate).format()
        };
    };

    const onSubmit = data => {
        const task = createTaskEntry(data);
        const id = userId.userId;
        dispatch(addUserTask({id,task}));
        handleClose();
    };

    const theme = createTheme({
        typography: {
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            font: 'unset'
        }
    })

    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver : yupResolver(validationSchema)
    })

    return (
        <div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <IconButton onClick={handleClose} id='close_button' className='family_group'>
                    <CloseIcon color="primary"></CloseIcon>
                </IconButton>
                <div className='task_title'>Add task</div>
            </DialogTitle>
            <form>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <ThemeProvider theme={theme} >
                            <TextField id='title' name='confirmTitle' placeholder='Confirm title'  variant='outlined'
                            margin='none' {...register('title')} error={errors.title ? true : false}>
                            </TextField>
                        </ThemeProvider>
                        <Typography variant="inherit" color="error">
                            {errors.title?.message}
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <TextField id='description' name='confirmDescription' placeholder='Confirm description' variant='outlined'
                            margin='none' {...register('description')} error={errors.description ? true : false}>
                            </TextField>
                        </ThemeProvider>
                        <Typography variant="inherit" color="error">
                            {errors.description?.message}
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker id='finishTaskDate'
                                label="Finish date" {...register('finishTaskDate')} value={taskFinishDateTime} onChange={(newValue) => setTaskFinishDateTime(newValue)}/>
                            </DemoContainer>
                        </LocalizationProvider>
                        <Typography variant="inherit" color="error">
                            {errors.finishDate?.message}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='success' size='medium' onClick={handleSubmit(onSubmit)}>Confirm</Button>
                </DialogActions>
            </form>
        </Dialog>
        </div>
    );
}

export default CreateTaskPopup;