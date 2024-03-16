import { createSlice } from '@reduxjs/toolkit'

const name = JSON.parse(localStorage.getItem("name"))
const status = JSON.parse(localStorage.getItem("status"))

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    status: status ? status : "user",
    user:{
        name: "",
        email: "",
        phoneno: "",
        status:"",
    },
    userID: ""
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers:{
        SET_LOGIN(state, action){
            state.isLoggedIn = action.payload
        },
        SET_NAME(state, action){
            localStorage.setItem("name", JSON.stringify(action.payload))
            state.name = action.payload
        },
        SET_STATUS(state, action){
            localStorage.setItem("status", JSON.stringify(action.payload))
            state.status = action.payload
        },
        SET_USER(state, action){
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phoneno = profile.phoneno;
            state.user.status = profile.status;
        },
        SET_USERID(state, action){
            state.userID = action.payload
        }
        

    }
})

export const { SET_LOGIN, SET_NAME, SET_USER, SET_STATUS, SET_USERID } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectStatus = (state) => state.auth.status;
export const selectUser = (state) => state.auth.user;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;