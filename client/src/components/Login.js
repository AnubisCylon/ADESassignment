import './login.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setInputEmail] = useState("");
  const [password, setInputPassword] = useState("");

  const navigate = useNavigate();
  // connect to client side
  const login = () => {
    axios.post("http://localhost:5000/api/users/login", {
      email: email,
      password: password,
    }).then((response) => { 
      if(response.data === 'Missing Credentials'){
        alert('Missing Credentials')
      }else if(response.data === 'Invalid Email'){
        alert('Wrong Email')
      }else if(response.status === 401){
        alert('Check yo shit')
      
      }else if (response.status === 200){
        navigate('/Browse')
      }
      
      //set userid value
      console.log(response);
      // window.location.href("/manage")
    });
  };
  
  // useEffect(() => {
  //   goHome()
  // }, [])
  //window.localStorage.setItem("userid",response)
  //window.localStorage.getItem("userid")get it 
  //window.localStorage.clear() clear it ! after log out
  return (
    <div className="app">
      <div className="login">

        <div className="top">
          <div className="wrapper">
            <img
              className="netflix-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </div>
        </div>
        <h1 className="signin">Sign In</h1>

        <input
          className="email"
          placeholder="Email"
          type="text"
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
        />
        {/* <label className="email-text">Email</label> */}

        <input
         placeholder="Password"
          className="password"
          type="password"
          onChange={(e) => {
            setInputPassword(e.target.value);
          }}
        />
        {/* <label className="password-text">Password</label> */}

        <button className="login-button" onClick={login}>Login</button>

        {/* <h3>Already a member? <Link to="/Browse">Sign In!</Link></h3> */}

      </div>
    </div>
  );
}