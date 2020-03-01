import { useState, useRef } from "react";
import * as axios from "../utils/axiosHandler";
import { setToken } from "../utils/tokenHandler";
import { useHistory } from "react-router-dom";

const checkIfEmpty = field => {
  return Boolean(field.length > 0);
};

const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
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
  login(data) {
    const env = this;
    if (this._config === "auth") {
      this._setResponse("failed", "global", "incorrect data set");
      return;
    }    
    axios.Post(
      "http://localhost:4000/Login",
      data,
      res => {
        setToken(res.data);
        env._setResponse(200, "global", "loged in");
        env._history.push("/User/NotesPanel");
      },
      err => {
        env._setResponse(400, err.data.field, err.data.message);
      }
    );
  },
  signUp(data){
    const env = this;
    if (this._config === "default") {
      this._setResponse("failed", "global", "incorrect data set");
      return;
    }
    axios.Post(
      "http://localhost:4000/Signup",
      data,
      res => {
        setToken(res.data);
        env._setResponse(200, "global", "signed in");
        env.history.push("/User/NotesPanel");
      },
      err => {
        env._setResponse(400, err.data.field, err.data.message);
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
    setData({ ...ref.current[0].data, [field]: value });
  };
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = [
      {response,data},
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
    ref.current[0] = {response,data};
  }
  return ref.current;
};
