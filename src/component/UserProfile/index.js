import "./style.css"
import axios from "axios";
import React, { useState, useEffect, useContext } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { setProfile } from "../../redux/reducers/users/users";
import { updateProfile } from "../../redux/reducers/users/users";


import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


export default function Profile() {

    const [name, setName] = useState("");
    const [username, setusername] = useState("");
    const [phone, setPhone] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [show3, setShow3] = useState(false);


    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);






    const state = useSelector((state) => {
        console.log(state);
        return {
            users: state.users.users,
            login: state.auth.login,
            id: state.auth.id,
            profile: state.users.profile
        }
    })


    const getUserProfile = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${state.id}`)
            .then((result) => {
                console.log(result.data);
                dispatch(setProfile(result.data))
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {
        getUserProfile()

    }, [])


    return (
        <div className="Profile">
            <figure class="snip1376">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample17.jpg" alt="sample17" />
                <figcaption>
                    <h2> {state.profile.name}</h2>
                    <br />
                    <div className="Profile2">
                        <p> {state.profile.username}</p>
                        <br />
                        <p>  {state.profile.phone}</p>
                    </div>


                </figcaption>
            </figure>
            <br/>
            <div  className="Profile3">
            <Button variant="primary" onClick={() => {
                handleShow3()
            }}>
                Update
            </Button>
            </div>
            

            {/* this Poup for Update */}
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Post Title"
                                onChange={(e) => { setName(e.target.value) }}

                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="text"
                                placeholder="UserName"
                                onChange={(e) => { setusername(e.target.value) }}

                            />
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                onChange={(e) => { setPhone(e.target.value) }}

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
                            dispatch(updateProfile({ name: name, username: username, phone: phone }))
                        }}
                    >
                        update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
