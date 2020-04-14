import axios from "axios";
import { getToken } from "./tokenHandler";
const setOptions = token => {
  return {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://bartek-notemaster.herokuapp.com' : "http://localhost:4000",
    headers: { Authorization: "Bearer " + token }
  };
};

export const Get = async(path, success,failed) => {
  const token = getToken();
  const options = setOptions(token);
  return axios
    .get(path,options)
    .then(response => {
      success(response);
    })
    .catch(error => {
      console.log(error.response);
      failed(error.response)
    });
};
export const Post = async(path, body, success, failed) => {
         const token = getToken();
         const options = setOptions(token);
         return axios
           .post(path, body, options)
           .then(response => {
             success(response);
           })
           .catch(error => {
             console.log(error.response);
             failed(error.response);
           });
       };
export const Patch = async(path, body, success, failed) => {
         const token = getToken();
         const options = setOptions(token);
         return axios
           .patch(path, body, options)
           .then(response => {
             success(response);
           })
           .catch(error => {
             console.log(error.response);
             failed(error.response)
           });
       };
export const Delete = async(path, success, failed) => {
         const token = getToken();
         const options = setOptions(token);
         return axios
           .delete(path, options)
           .then(response => {
             success(response);
           })
           .catch(error => {
             console.log(error.response);
             failed(error.response)
           });
       };
