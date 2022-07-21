import "./style.css"
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { deletePost } from "../../redux/reducers/posts";
import { setUsers } from "../../redux/reducers/users/users";
import { setAlbums } from "../../redux/reducers/albums";
import { setComments } from "../../redux/reducers/comments";
import { setPosts } from "../../redux/reducers/posts";
import { updatePost } from "../../redux/reducers/posts";

export default function Posts() {

    const [massge, setMessage] = useState("")
    const [deleted, setDeleted] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [postid, setPostid] = useState("");


    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);



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

    const deleteIem = (id2) => {

        if (id2 == deleted) {
            dispatch(deletePost(id2));
            handleClose();
        }
    };

    const updateItem = (id) => {
        dispatch(
            updatePost({
                title,
                body,
                id,
            })
        );
    };



    return (
        <div class="Posts-container">
            <br />
            <Button variant="primary" onClick={handleShow2}>
                Add Post
            </Button>

            <br />

            {state.posts.map((ele) => {

                return <div key={ele.id}>

                    <Row xs={1} md={2} className="justify-content-md-center g-4" >
                        {Array.from({ length: 1 }).map((_, idx) => (
                            <Col>
                                <Card>
                                    {/*      <Card.Img variant="top" src="holder.js/100px160" /> */}
                                    <Card.Body>


                                        <Card.Title><h3>{ele.title}</h3></Card.Title>
                                        <Card.Text>
                                            <h5>{ele.body}</h5>
                                        </Card.Text>



                                        {state.comments.map((elem) => {
                                            if (ele.id === elem.postId) {
                                                return <Card body><h6>Comment by : {elem.name}</h6> {elem.body}</Card>
                                            }
                                        })}

                                        {(ele.userId == state.id) ?
                                            (<>
                                                <Button variant="primary" onClick={() => {
                                                    handleShow();
                                                    setDeleted(ele.id);
                                                }} >delete</Button>
                                                {/* this Poup for delete */}
                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Whould you like to delete this</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>{ele.title} Post</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            No
                                                        </Button>
                                                        <Button variant="primary" onClick={() => {

                                                            deleteIem(deleted)

                                                        }}> Yes </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <i>   </i>
                                                <Button variant="primary" onClick={() => {
                                                    handleShow3()
                                                    setTitle(ele.title)
                                                    setBody(ele.body)
                                                    setPostid(ele.id)
                                                }}>
                                                    Update
                                                </Button>
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

            {/* this Poup for Add */}
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose2}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* this Poup for Update */}
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Post Title"
                                onChange={(e) => { setTitle(e.target.value) }}

                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea" rows={3}


                                onChange={(e) => { setBody(e.target.value) }}

                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose3}>
                        Close
                    </Button>

                    <Button
                        variant="primary"
                        onClick={() => {
                            handleClose3();
                            dispatch(updatePost({ title: title, body: body, id: postid }))
                        }}
                    >
                        update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
