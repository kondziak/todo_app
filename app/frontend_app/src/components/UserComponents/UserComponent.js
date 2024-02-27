import './app.css';
import GetUserTasksComponent from './GetUserTasksComponent';
import React, { useCallback, useEffect, useState} from "react";
import { findUserByEmail } from '../../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import TaskComponent from '../TaskComponents/TaskComponent';
import CookieService from "../../services/cookiesService";
import {useNavigate} from 'react-router-dom';

const UserComponent = () => {
    const navigate = useNavigate();
    let data = useSelector(state => state.users);
    let loggedUser = useSelector(state => state.loggedUser);
    let [getUser,setGetUser] = useState(false);
    const dispatch = useDispatch();

    const initUsers = useCallback(() => {
        dispatch(findUserByEmail(loggedUser[0].loggedUser));
    },[loggedUser,dispatch]);

    useEffect(() => {
        initUsers();
        setGetUser(true);
    },[initUsers])

    function createTask () {
        return data.tasks.map(task => {
            return <TaskComponent task={task} user={data}/>
        });
    }
    function displayUserTab() {
        return (
            <>
                <div key={data.id}>
                    <span className='user'>{data.name} {data.lastname}</span> 
                    <GetUserTasksComponent userId={data.id}/>
                </div>
            </>
        );
    }
    function logout(event) {
        event.preventDefault();
        const service = new CookieService();
        service.removeToken();
        return navigate("/sign_in");
    }
    if (!data || Object.keys(data).length === 0 ) {
        return (<div className="table"/>)
    } else {
        return (
            <div className="table">
                <div className="user_box">
                    {
                        displayUserTab()
                    }
                </div>
                <div className="tasks_table">
                   {
                    getUser && createTask()
                   }
                </div>
                <div className='logout' onClick={(event) => logout(event)}>
                    <span>Logout</span>
                </div>
            </div>
        )    
    }
}

export default UserComponent;