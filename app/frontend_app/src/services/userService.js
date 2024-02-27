import http from "../utils/http/http-common";
import CookieService from "./cookiesService";
const cookieService = new CookieService();


const getAllUsers = () => {
    http.defaults.headers.common['Authorization'] = cookieService.getToken();
    return http.get("/api/users/getAll");
}

const getUser = (id) => {
    return http.get(`/api/users/${id}`);
}

const findUserByEmail = (email) => {
    http.defaults.headers.common['Authorization'] = cookieService.getToken();
    return http.get(`/api/users/find?email=${email}`);
}

const createUser = (user) => {
    return http.post("/api/users",user);
}

const getUserTasks = (id) => {
    return http.get(`/api/users/tasks/${id}`);
}

const addUserTask = (id,task) => {
    const stringifiedTask = JSON.stringify(task, null, 2);
    http.defaults.headers.common['Authorization'] = cookieService.getToken();
    return http.post(`/api/users/${id}/tasks`,stringifiedTask);
}

const deleteUserTask = (id,task) => {
    const taskId = task.id;
    http.defaults.headers.common['Authorization'] = cookieService.getToken();
    return http.delete(`/api/users/${id}/tasks/${taskId}`);
}
const login = (loginDTO) => {
    const stringifiedLoginDTO = JSON.stringify(loginDTO,null,2);
    return http.post("/api/auth/login",stringifiedLoginDTO);
}

const userService = {
    getAllUsers,
    getUser,
    createUser,
    getUserTasks,
    addUserTask,
    deleteUserTask,
    login,
    findUserByEmail
};

export default userService;