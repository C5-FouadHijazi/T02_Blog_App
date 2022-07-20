import "./style.css"
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { deletePost } from "../../redux/reducers/posts";
import { setUsers } from "../../redux/reducers/users/users";
import { setAlbums } from "../../redux/reducers/albums";
import { setComments } from "../../redux/reducers/comments";
import { setPosts } from "../../redux/reducers/posts";

export default function Posts() {

    const [massge, setMessage] = useState("")
    const [set, setSet] = useState(false)
    const [show, setShow] = useState(false)



    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const state = useSelector((state) => {

        return {
            users: state.users.users,
            login: state.auth.login,
            logout: state.auth.logout,
            posts: state.posts.posts,
            albums: state.albums.albums,
            comments: state.comments.comments,
            id: state.auth.id
        }
    })



    return (
        <div class="Posts-container">
            <Button variant="primary" onClick={() => {
            }} >add Post</Button>{' '}
            <br />
            {state.posts.map((ele) => {

                return <div key={ele.id}>

                    <Row xs={1} md={2} className="justify-content-md-center g-4" >
                        {Array.from({ length: 1 }).map((_, idx) => (
                            <Col>
                                <Card>
                                    {/*      <Card.Img variant="top" src="holder.js/100px160" /> */}
                                    <Card.Body>


                                        <Card.Title>{ele.title}</Card.Title>
                                        <Card.Text>
                                            {ele.body}
                                        </Card.Text>



                                        {state.comments.map((elem) => {
                                            if (ele.id === elem.postId) {
                                                return <div>{elem.body}</div>
                                            }
                                        })}

                                        {(ele.userId == state.id) ?
                                            (<>
                                                <Button variant="primary" onClick={() => {
                                                    if (ele.userId == state.id) {
                                                        dispatch(deletePost(ele.id))
                                                    }
                                                }} >delete</Button>

                                                <Button variant="primary">update</Button>
                                            </>)
                                            : ""}


                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h1></h1>
                    <h5></h5>
                </div >

            })}

        </div >
    )
}
