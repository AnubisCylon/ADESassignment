import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.scss";
// import Quotes from "../quotes";

export default function Register() {
    const [name, setInputName] = useState("");
    const [email, setInputEmail] = useState("");
    const [password, setInputPassword] = useState("");

    const signUp = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/api/users/register", {
            name: name,
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                alert("Account created!")
            } else {
                alert("Sign Up Failed")
            }
        });
    };
    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                </div>
            </div>

            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>

                <div className="input">
                    <input type="text" placeholder="username"
                        onChange={(e) => {
                            setInputName(e.target.value);
                        }} />
                </div>
                <div className="input">
                    <input type="email" placeholder="email address"
                        onChange={(e) => {
                            setInputEmail(e.target.value);
                        }} />
                </div>
                <form className="input">
                    <input type="password" placeholder="password"
                        onChange={(e) => {
                            setInputPassword(e.target.value);
                        }} />
                    <button className="registerButton" onClick={signUp}>
                        Sign Up
                    </button>
                </form>
                <h3>Already a member? <Link to="/Login">Sign In!</Link></h3>
                {/* <button className="loginButton">Sign In</button> */}

                {/* <button type='button'
                    onClick={() => {} }>Sign In
                </button> */}

            </div>
        </div>
    );
}