import axios from "axios";
import { GetToken } from "./tokenHandler";

const setOptions = token => {
  return {
    headers: { Authorization: "Bearer " + token }
  };
};

export const Get = (path, callback) => {
  const token = GetToken();
  const options = setOptions(token);
  axios
    .get(path, options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const Post = (path, body, callback) => {
  const token = GetToken();
  const options = setOptions(token);
  axios
    .post(path, body, options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const Patch = (path, body, callback) => {
  const token = GetToken();
  const options = setOptions(token);
  axios
    .patch(path, body, options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const Delete = (path, callback) => {
  const token = GetToken();
  const options = setOptions(token);
  axios
    .delete(path, options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
