import axios from "axios";
import { GetToken } from "./tokenHandler";

const token = GetToken();
const options = {
  headers: { Authorization: "Bearer " + token }
};

export const Get = (path, callback) => {
  axios
    .get(path,options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const Post = (path,body,callback) => {
  axios
    .post(path,body,options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const Patch = (path,body,callback) => {
  axios
    .patch(path,body,options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
export const Delete = (path, callback) => {
  axios
    .delete(path,options)
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error.message);
    });
};
