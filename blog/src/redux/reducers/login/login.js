import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
    name: "login",
    initialState: {
        login: localStorage.getItem("name") ? true : false ,
        logout: true,

        name: localStorage.getItem("name") || "",
        id: localStorage.getItem("id")  | "",
        userId : localStorage.getItem("UserId") ? localStorage.getItem("UserId") : "",

    },
    reducers: {
        setisLogin: (state, action) => {
            state.login = true
            state.name = action.payload;
            localStorage.setItem("name", true)

            state.id = action.payload;
            console.log(action.payload ,"id");
            localStorage.setItem("id", state.id );

            state.userId = action.payload;
            console.log(action.payload ,"uderId");
            localStorage.setItem("userId", state.userId);

        },
        setisLogout : (state,action) =>{
            state.logout = false
            state.name = "";
            localStorage.removeItem("name")
        },
        }
})

export const { setisLogin, setisLogout ,setId,setUserId} = auth.actions;

export default auth.reducer;