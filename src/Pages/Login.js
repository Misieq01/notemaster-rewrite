import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import {setToken} from '../utils/tokenHandler'
import * as axios from '../utils/axiosHandler'

import Input from "../Components/Input";

import {LoginIcon,PasswordIcon} from '../Assets/Icons/index'

const Login = () => {
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
      <div className="auth__login-form">
        <h2 className="form__title">Login</h2>
        <div className="form__inputs-wrapper">
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
            <p className="form__password-reset">Forgot password ?</p>
          </Link>
        </div>
        <button className="form__button" onClick={loginHandler}>
          Login
        </button>
        <div className="form__bottom-text-wrapper">
          <p className="form__bottom-text-wrapper--text">
            Don't have account yet ?
          </p>
          <Link to="/Signup" className="form__bottom-text-wrapper--link">
            Singup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
