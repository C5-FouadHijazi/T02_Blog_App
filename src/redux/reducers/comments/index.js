import { createSlice } from "@reduxjs/toolkit";

export const comments = createSlice({
    name: "comments",
    initialState: {
        comments: [],
    },
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload);
        },

        deleteComment: (state, action) => {
            state.comments = state.comments.filter((comments, index) => {
                return comments.id != action.payload;
            });
        },

        updateComment: (state, action) => {
            state.comments = state.comments.map((comments, index) => {
                if (comments.id == action.payload.id) {
                    return action.payload;
                }
                return comments;
            });
        },
    },
})

export const { setComments , addComment , deleteComment, updateComment} = comments.actions;

export default comments.reducer;