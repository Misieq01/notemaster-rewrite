import axios from "axios";
import { GetToken } from "./tokenHandler";

const setOptions = token => {
  return {
    headers: { Authorization: "Bearer " + token }
  };
};

export const Get = async(path, success,failed) => {
  const token = GetToken();
  const options = setOptions(token);
  return axios
    .get(path,options)
    .then(response => {
      success(response);
    })
    .catch(error => {
      console.log(error.response);
      failed(error)
    });
};
export const Post = async(path, body, success, failed) => {
         const token = GetToken();
         const options = setOptions(token);
         return axios
           .post(path, body, options)
           .then(response => {
             success(response);
           })
           .catch(error => {
             console.log(error.response);
             failed(error)
           });
       };
export const Patch = async(path, body, success, failed) => {
         const token = GetToken();
         const options = setOptions(token);
         return axios
           .patch(path, body, options)
           .then(response => {
             success(response);
           })
           .catch(error => {
             console.log(error.response);
             failed(error)
           });
       };
export const Delete = async(path, success, failed) => {
         const token = GetToken();
         const options = setOptions(token);
         return axios
           .delete(path, options)
           .then(response => {
             success(response);
           })
           .catch(error => {
             console.log(error.response);
             failed(error)
           });
       };
