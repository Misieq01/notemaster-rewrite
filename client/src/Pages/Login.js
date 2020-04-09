import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

import Input from "../Components/Input";

import { LoginIcon, PasswordIcon } from "../Assets/Icons/index";

const Login = () => {
  const [auth, action] = useAuth();
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
            onChange={event => action._updateField("email", event.target.value)}
            error={auth.response.field === "email" ? auth.response.message : null}
          />
          <Input
            label="Password:"
            placeholder="Type your password"
            icon={PasswordIcon}
            inputType="password"
            onChange={event => action._updateField("password", event.target.value)}
            error={auth.response.field === "password" ? auth.response.message : null}
          />
          <Link to="/Reset" style={{ alignSelf: "flex-end" }}>
            <p className="form__password-reset">Forgot password ?</p>
          </Link>
        </div>
        <button className="form__button" onClick={() => action.login(auth.data)}>
          Login
        </button>
        <div className="form__bottom-text-wrapper">
          <p className="form__bottom-text-wrapper--text">Don't have account yet ?</p>
          <Link to="/Signup" className="form__bottom-text-wrapper--link">
            Singup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
