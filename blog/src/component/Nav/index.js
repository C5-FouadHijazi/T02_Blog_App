import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginContext } from '../../App';
import { setisLogin, setisLogout } from '../../redux/reducers/login/login';
import { auth } from '../../redux/reducers/login/login';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logOut = () => {
    dispatch(setisLogout(localStorage.removeItem("name")))
  };


  const state = useSelector((state) => {
    return {
      login: state.auth.login,
      logout: state.auth.logout,
      users: state.users.users,
    }
  })
  useEffect(() => {
    if(state.login) {

    } else {
      navigate('/')
    }

  }, [])


  /*   email: Sincere@april.biz
       username: Bret */

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/profile">{state.login ? localStorage.getItem('name')

          : <h2 href="/" >Freedom</h2>}</Navbar.Brand>

        {state.login === true ? (
          <>
            <Nav className="d-flex justify-content-center">
              <Nav.Link className="d-flex justify-content-center" href="/"></Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
              <Nav.Link href="/posts">Posts</Nav.Link>
              <Nav.Link onClick={logOut} href="/home">logout</Nav.Link>

            </Nav>
          </>
        ) : (
          <>
            <Nav className="d-flex justify-content-center">
              <Nav.Link href="/">login</Nav.Link>
            </Nav>
          </>

        )}

      </Container>
    </Navbar >


  );
}

export default ColorSchemesExample;