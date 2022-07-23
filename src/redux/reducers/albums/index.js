import { createSlice } from "@reduxjs/toolkit";

export const albums = createSlice({
    name: "albums",
    initialState: {
        albums: [],
        },
    reducers: {
        setAlbums: (state, action) => {
            state.albums = action.payload;
        }
    }
})
/* https://jsonplaceholder.typicode.com/albums */

export const {setAlbums} = albums.actions; 

export default albums.reducer;