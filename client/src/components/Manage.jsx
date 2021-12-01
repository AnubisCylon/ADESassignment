import axios from "axios";
import React, { useState } from 'react';
import "./Manage.scss";
import NavBar from '../navigate/NavBar'

export default function Manage() {
    const [name, setInputName] = useState("");
    const [email, setInputEmail] = useState("");
    const [password, setInputPassword] = useState("");

    const updatename = (event) => {
        event.preventDefault();
        console.log(name)
        console.log(email)
        axios.put("http://localhost:5000/api/users/profile", {
            name: name, //backend: whats gotten from frontend
            email: email
        }).then((response) => {
            console.log(response);
        });
    };
    const updatepw = (event) => {
        event.preventDefault();
        axios.put("http://localhost:5000/api/users/password", {
            password: password,
            email: email
        }).then((response) => {
            console.log(response);
        });
    };
    const deleteAcc = (event) => {
        event.preventDefault();
        console.log(email)
        axios.delete("http://localhost:5000/api/users/acc", {
            email: email
        }).then((response) => {
            console.log(response);
        });
    };
    return (
        <div className="manage">
            <NavBar/>
            <div className="top">
                <h1 className="h1m">Manage My Profile!</h1>
                <h2 className="h2m">Update Username</h2>
                <form className="managename">
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
                    <button className="updateNameButton" onClick={updatename}>
                        Update Username
                    </button>
                </form>
                <h2>Update Password</h2>
                <form className="managepw">
                    <div className="input">
                        <input type="password" placeholder="password"
                            onChange={(e) => {
                                setInputPassword(e.target.value);
                            }} />
                    </div>
                    <div className="input">
                        <input type="email" placeholder="email address"
                            onChange={(e) => {
                                setInputEmail(e.target.value);
                            }} />
                    </div>
                    <button className="updatePw" onClick={updatepw}>
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}