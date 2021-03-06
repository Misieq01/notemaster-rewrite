import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import Input from "../Components/Input";
import { UserIcon, EmailIcon, PasswordIcon } from "../Assets/Icons/index";

const Signup = () => {
  const [auth, action] = useAuth("auth");

  return (
    <div className="auth__container">
      <div className="auth__signup-form">
        <h2 className="form__title">Signup</h2>
        <div className="form__inputs-wrapper">
          <Input
            label="First name:"
            placeholder="Type your first name"
            icon={UserIcon}
            inputType="text"
            onChange={event => action._updateField("firstName", event.target.value)}
            error={auth.response.field === "firstName" ? auth.response.message : null}
          />
          <Input
            label="Last name:"
            placeholder="Type your last name"
            icon={UserIcon}
            inputType="text"
            onChange={event => action._updateField("lastName", event.target.value)}
            error={auth.response.field === "lastName" ? auth.response.message : null}
          />
          <Input
            label="Email:"
            placeholder="It will be also your login"
            icon={EmailIcon}
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
          <Input
            label="Confirm password:"
            placeholder="Retype your password"
            icon={PasswordIcon}
            inputType="password"
            onChange={event => action._updateField("passwordConf", event.target.value)}
            error={auth.response.field === "passwordConf" ? auth.response.message : null}
          />
        </div>
        <button className="form__button" onClick={() => action.signUp(auth.data)}>
          Signup
        </button>
        <div className="form__bottom-text-wrapper">
          <p className="form__bottom-text-wrapper--text">Already have account ?</p>
          <Link to="/Login" className="form__bottom-text-wrapper--link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
