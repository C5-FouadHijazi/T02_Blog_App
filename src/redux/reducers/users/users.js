import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
    name: "users",
    initialState: {
        users: [],
        profile: JSON.parse(localStorage.getItem("profile")) || []

    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload
            localStorage.setItem("profile", JSON.stringify(action.payload));
        },
        updateProfile: (state, action) => {
            state.profile = action.payload
            console.log(action.payload);
            if (state.profile.id === action.payload.id) {
                state.profile.name = action.payload.name || state.profile.name
                state.profile.username = action.payload.username || state.profile.username
                state.profile.phone = action.payload.username || state.profile.phone
            } else {
                return
            }
        }

    }
})

export const { setUsers, setProfile , updateProfile} = users.actions;

export default users.reducer;