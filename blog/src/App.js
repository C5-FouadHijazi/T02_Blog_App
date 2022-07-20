import './App.css';
import axios from "axios";
import React, { useState, useEffect, useParam, createContext } from 'react';
import { Route, Routes } from "react-router-dom"

import Login from './component/login';
import ColorSchemesExample from './component/Nav';
import UserComponent from './component/UserPage';
import Posts from './component/PostPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from './redux/reducers/users/users';
import { setPosts } from './redux/reducers/posts';
import { setComments } from './redux/reducers/comments/index'
import { setAlbums } from './redux/reducers/albums/index'


function App() {

  const dispatch = useDispatch();

  const getUsers = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then((result) => {

        dispatch(setUsers(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getPosts = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((result) => {

        dispatch(setPosts(result.data))


      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getcomments = () => {
    axios.get(`https://jsonplaceholder.typicode.com/comments`)
      .then((result) => {
    
        dispatch(setComments(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getAlbums = () => {
    axios.get(`https://jsonplaceholder.typicode.com/albums`)
      .then((result) => {

        dispatch(setAlbums(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    getUsers()
    getPosts()
    getcomments()
    getAlbums()
  }, [])

  return (
    <div className="App">


      <ColorSchemesExample />

      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/users"} element={<UserComponent />} />
        <Route path={"/home"} element={<UserComponent />} />
        <Route path={"/posts"} element={<Posts />} />
      </Routes>

    </div>
  );
}

export default App;
