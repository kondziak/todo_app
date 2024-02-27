import {  configureStore } from "@reduxjs/toolkit";
import {useReducer}  from "../reducers/userReducer";
import { userLoggedReducer } from "../reducers/userReducer";

const reducer = {
    users: useReducer,
    loggedUser: userLoggedReducer
}
const store = configureStore({
    reducer : reducer,
    devTools : true,
});

export default store;