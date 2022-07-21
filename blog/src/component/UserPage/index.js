import "./style.css"
import axios from "axios";
import React, { useState, useEffect, useContext } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { setUsers } from "../../redux/reducers/users/users";
import { setAlbums } from "../../redux/reducers/albums";
import { setComments } from "../../redux/reducers/comments";
import { setPosts } from "../../redux/reducers/posts";


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export default function UserComponent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUsers = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then((result) => {
        console.log(result.data);
        dispatch(setUsers(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getPosts = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((result) => {
        console.log(result.data);
        dispatch(setPosts(result.data))


      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getcomments = () => {
    axios.get(`https://jsonplaceholder.typicode.com/comments`)
      .then((result) => {
        console.log(result.data);
        dispatch(setComments(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getAlbums = () => {
    axios.get(`https://jsonplaceholder.typicode.com/albums`)
      .then((result) => {
        console.log(result.data);
        dispatch(setAlbums(result.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (state.login) {

    } else {
      navigate('/')
    }

  }, [])

  useEffect(() => {
    getUsers()
    getPosts()
    getcomments()
    getAlbums()
  }, [])

  const state = useSelector((state) => {
    console.log(state);
    return {
      users: state.users.users,
      login: state.auth.login,
      logout: state.auth.logout,
      posts: state.posts.posts,
      albums: state.albums.albums,
    }
  })
  console.log(state.albums);
  console.log(state.posts);


  return (
    <div class="User-container">
      <div>
        {state.users.map((element, index) => {
          let albumCounter = 0;
          let postsCounter = 0;
          state.posts.map((post, i) => {
            if (post.userId === index + 1) {
              postsCounter++;
            }
            return postsCounter;
          });
          state.albums.map((album, i) => {
            if (album.userId === index + 1) {
              albumCounter++;
            }
            return albumCounter;
          });
          return (
            <div>
              
              <Card>
                <Card.Header><h3>{element.name}</h3></Card.Header>
                <Card.Body>
                  <Card.Title><h5>Name :{element.name}</h5></Card.Title>
              <Card.Title><h5>Address :{element.address.street}</h5></Card.Title>
                  <Card.Title><h5>Posts :{postsCounter}</h5></Card.Title>
                  <Card.Text><h5>Albums :{albumCounter}</h5></Card.Text>
          {/*         <Button href="/posts" variant="primary">see More </Button> */}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

      {/*   return <div key={ele.id}>
                     */}



    </div>






  )
}
