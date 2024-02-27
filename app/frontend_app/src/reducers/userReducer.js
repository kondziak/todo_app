import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = [];

export const createUser = createAsyncThunk("/api/users/create",async ({user}) =>{
    const res = await userService.createUser(user);
    return res;
});

export const getUser = createAsyncThunk("/api/users/get", async ({id}) => {
    const res = await userService.getUser(id);
    return res.data;
});

export const getAllUsers = createAsyncThunk("/api/users/getAll", async () => {
    const res = await userService.getAllUsers();
    return res.data;
});

export const addUserTask = createAsyncThunk("/api/users/tasks/add", async (entry) => {
    const res = await userService.addUserTask(entry.id,entry.task);
    return res.data;
});

export const deleteUserTask = createAsyncThunk("/api/users/task/delete", async (entry) => {
    const res = await userService.deleteUserTask(entry.id,entry.task);
    return res.data;
})

export const findUserByEmail = createAsyncThunk("/api/users/find/email", async (entry) => {
    const res = await userService.findUserByEmail(entry);
    return res.data;
});

const userSlice = createSlice({
    name:"users",
    initialState,
    extraReducers: {
        [createUser.fulfilled] : (state,action) => {
            return action.payload;
        },
        [getUser.fulfilled] : (state,action) => {
            return action.payload;
        },
        [getAllUsers.fulfilled] : (state,action) => {
            return [...action.payload];
        },
        [addUserTask.fulfilled] : (state,action) => {
            return action.payload;
        },
        [addUserTask.rejected] : (state,action) => {
            console.log(action);
        },
        [findUserByEmail.fulfilled] : (state,action) => {
            console.log(action.payload);
            return action.payload;
        },
        [deleteUserTask.fulfilled] : (state,action) => {
            console.log(action.payload);
            return action.payload;
        }
    },
});

const userLoggedData = createSlice({
    name:"UsersLoggedData",
    initialState: initialState,
    reducers: {
        addEmail: (state,action) => {
            const email = action.payload;
            const loggedUser = {loggedUser : email};
            return [...state, loggedUser];
        }
    }
})

export const {addEmail} = userLoggedData.actions;

export const useReducer = userSlice.reducer;
export const userLoggedReducer = userLoggedData.reducer;