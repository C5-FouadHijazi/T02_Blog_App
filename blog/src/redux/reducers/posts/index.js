import { createSlice } from "@reduxjs/toolkit";

export const posts = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((posts, index) => {
                return posts.id != action.payload;
            });
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map((element) => {
                console.log(action.payload);
                if (element.id === action.payload.id) {
                    element.body = action.payload.body || element.body
                    element.title = action.payload.title || element.title
                    return element
                } else {
                    return element;
                }
            })
        }
    }
})

export const { setPosts, addPost, deletePost, updatePost } = posts.actions;

export default posts.reducer;