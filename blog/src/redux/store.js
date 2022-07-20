import { configureStore } from "@reduxjs/toolkit";
import comments from "./reducers/comments";
import  auth  from "./reducers/login/login";
import posts from "./reducers/posts";
import  users  from "./reducers/users/users";
import albums from "./reducers/albums";


export default configureStore ({
    reducer : {
        auth : auth,
        users : users,
        posts : posts,
        comments : comments,
        albums : albums,
    },
})