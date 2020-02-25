import { useState, useRef } from "react";
import * as axios from "../utils/axiosHandler";
import { setToken } from "../utils/tokenHandler";
import { useHistory } from "react-router-dom";

const checkIfEmpty = field => {
  return Boolean(field.length > 0);
};

const validateEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
};

const checkPasswordMatch = (pass, confPass) => {
  return Boolean(pass === confPass);
};

const validatePassword = pass => {
  return Boolean(pass.length >= 8);
};

const UseAuthProto = {
  checkIfEmpty,
  validateEmail,
  checkPasswordMatch,
  validatePassword,
  login() {
    const { email, password } = { ...this._data };
    const env = this;
    if (this._config === "auth") {
      this._setResponse("failed", "global", "incorrect data set");
      return;
    }
    if (!validateEmail(email)) {
      this._setResponse("failed", "email", "incorrect email");
      return;
    }
    if (!validatePassword(password)) {
      this._setResponse("failed", "password", "wrong password");
      return;
    }
    axios.Post(
      "http://localhost:4000/Login",
      this._data,
      res => {
        setToken(res.data);
        env._setResponse("success", "global", "loged in");
        env.history.push("/User/NotesPanel");
      },
      err => {
        env._setResponse("failed", "global", "something went wrong, please try again later");
        console.log(err);
      }
    );
  },
  signUp(){
    const { firstName, lastName, email, password, passwordConf } = { ...this._data };
    const postedData = { ...this._data };
    const env = this;
    if (this._config === "default") {
      this._setResponse("failed", "global", "incorrect data set");
      return;
    }
    if (!checkIfEmpty(firstName)) {
      this._setResponse("failed", "firstName", "This field can't be empty");
      return;
    }
    if (!checkIfEmpty(lastName)) {
      this._setResponse("failed", "firstName", "This field can't be empty");
      return;
    }
    if (!validateEmail(email)) {
      this._setResponse("failed", "email", "incorrect email");
      return;
    }
    if (!validatePassword(password)) {
      this._setResponse("failed", "password", "wrong password");
      return;
    }
    if (!checkPasswordMatch(password, passwordConf)) {
      this._setResponse("failed", "passwordConf", "passwords don't match");
      return;
    }
    delete postedData.passwordConf;
    axios.Post(
      "http://localhost:4000/Signup",
      postedData,
      res => {
        setToken(res.data);
        env._setResponse("success", "global", "signed in");
        env.history.push("/User/NotesPanel");
      },
      err => {
        env._setResponse("failed", "global", "something went wrong, please try again later");
        console.log(err);
      }
    );
  }
};

const configs = {
  default: {
    email: "",
    password: ""
  },
  auth: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConf: ""
  }
};

export const useAuth = (config = "default") => {
  const history = useHistory();
  const [response, setResponse] = useState({});
  const [data, setData] = useState(configs[config]);
  const _setResponse = (status, field, message) => {
    setResponse({ status, field, message });
  };
  const _updateField = (field, value) => {
    setData({ ...data, [field]: value });
  };
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = [
      response,
      {
        __proto__: UseAuthProto,
        _data: data,
        _setResponse,
        _updateField,
        _config: config,
        _history: history
      }
    ];
  } else {
    ref.current[0] = response;
  }
  console.log(ref.current)
  return ref.current;
};
