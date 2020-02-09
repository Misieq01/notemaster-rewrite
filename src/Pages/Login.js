import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import {setToken} from '../utils/tokenHandler'
import * as axios from '../utils/axiosHandler'

import Input from "../Components/Input";

import {LoginIcon,PasswordIcon} from '../Assets/Icons/index'

const Login = props => {
  const history = useHistory()

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const dataUpdate = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const loginHandler = () => {
    axios.Post("http://localhost:4000/Login", data, response => {
     setToken(response.data);
      history.push("/User/NotesPanel");
    },err=>console.log(err));
  };

  return (
    <div className="auth__container">
      <div className="auth__loginForm">
        <h2 className="auth__title">Login</h2>
        <div className="auth__inputWrapper">
          <Input
            label="Email:"
            placeholder="Type your Email"
            icon={LoginIcon}
            inputType="text"
            onChange={event => dataUpdate(event, "email")}
          />
          <Input
            label="Password:"
            placeholder="Type your password"
            icon={PasswordIcon}
            inputType="password"
            onChange={event => dataUpdate(event, "password")}
          />
          <Link to="/Reset" style={{ alignSelf: "flex-end" }}>
            <p className="login__forgotPassword">Forgot password ?</p>
          </Link>
        </div>
        <button className="auth__button" onClick={loginHandler}>
          Login
        </button>
        <div>
          <p className="auth__text">Don't have account yet ?</p>
          <Link to="/Signup">
            <p className="auth__changeAuth">Singup</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
