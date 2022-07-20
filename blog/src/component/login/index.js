import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginContext } from '../../App';
import { users } from '../../redux/reducers/users/users';
import { setisLogin } from '../../redux/reducers/login/login';

import "./style.css"

export default function Login() {

    const [users2, setUsers2] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const state = useSelector((state) => {
        return {
            users: state.users.users,
            login: state.auth.login,
            logout: state.auth.logout,
        }
    })




    return (
        <div class="container1">
            <div>

                <h1><span className='span'>Freedom </span>Bloggers</h1>
                <br />
                <p>
                    Welcome to our community -- Freedom Bloggers! This website exists to help all of you wish to talk in any thing without limites that will provide the time and financial freedom for you to create the lives that you really want to live!
                </p>
            </div>
            <div>

                <form class="box" id="form">
                    <div class="form-control">
                        <input id="firstname" type={"UserName"} placeholder='User Name' onChange={(e) => {
                            setUsers2(e.target.value)
                        }} />
                    </div>


                    <div class="form-control">
                        <input id="email" type={"email"} placeholder='Email' onChange={(e) => {
                            setEmail(e.target.value)
                        }} />

                    </div>


                    <button className='button' onClick={(e) => {
                        e.preventDefault()
                        console.log("sarami");
                        state.users.map((ele) => {
                            console.log(ele);
                            if (ele.email === email && ele.username === users2) {
                                console.log("true");
                                dispatch(setisLogin(true))
                                localStorage.setItem("name", ele.name)
                                localStorage.setItem("id", ele.id)
                                navigate("/home");
                            } else {
                                console.log("false");
                                setMessage("Check You'r UserName & Email You Intered")
                            }
                        })

                    }}>Login</button>


                    <p className={ state.login ? "successful" : "error Try Again"}>
                        {message}
                    </p>

                    <small
                    >By clicking the button, you are agreeing to our
                        <a href="#">Terms and Services</a></small
                    >
                </form>
            </div>
        </div>







    )
}
