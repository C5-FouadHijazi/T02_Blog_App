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
            state.posts.push(action.payload);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((posts, index) => {
                return posts.id != action.payload;
            });
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map((posts, index) => {
                if (posts.id == action.payload.id) {
                    return action.payload;
                }
                return posts;
            });
        },
    }
})

export const { setPosts, addPost, deletePost, updatePost } = posts.actions;

export default posts.reducer;