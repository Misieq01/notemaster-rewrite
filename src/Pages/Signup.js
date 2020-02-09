import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { setToken } from "../utils/tokenHandler";
import * as axios from "../utils/axiosHandler";
import Input from "../Components/Input";
import { UserIcon, EmailIcon, PasswordIcon } from "../Assets/Icons/index";

const Signup = () => {
  const history = useHistory();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: ""
  });

  const dataUpdate = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const signUpHandler = () => {
    if (data.password === data.passwordConf) {
      delete data.passwordConf;
      axios.Post("http://localhost:4000/Signup", data, res => {
        setToken(res.data);
        history.push("/User/NotesPanel");
      });
    }
  };

  return (
    <div className="auth__container">
      <div className="auth__signupForm">
        <h2 className="auth__title">Signup</h2>
        <div className="auth__inputWrapper">
          <Input
            label="First name:"
            placeholder="Type your first name"
            icon={UserIcon}
            inputType="text"
            onChange={event => dataUpdate(event, "firstName")}
          />
          <Input
            label="Last name:"
            placeholder="Type your last name"
            icon={UserIcon}
            inputType="text"
            onChange={event => dataUpdate(event, "lastName")}
          />
          <Input
            label="Email:"
            placeholder="It will be also your login"
            icon={EmailIcon}
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
          <Input
            label="Confirm password:"
            placeholder="Retype your password"
            icon={PasswordIcon}
            inputType="password"
            onChange={event => dataUpdate(event, "passwordConf")}
          />
        </div>
        <button className="auth__button" onClick={signUpHandler}>
          Signup
        </button>
        <div>
          <p className="auth__text">Already have account ?</p>
          <Link to="/Login">
            <p className="auth__changeAuth">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
