import React,{useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios'
import {SetToken} from '../utils/tokenHandler'
import Input from "./InputComponent";
import Button from "./ButtonComponent";

import { ReactComponent as LoginIcon } from "../Icons/Auth/login.svg";
import { ReactComponent as PasswordIcon } from "../Icons/Auth/password.svg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to left, #ff5f6d, #ffc371);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  width: 420px;
  height: 640px;
  background: rgb(245, 245, 245);
  border: 4px solid rgb(250, 250, 250);
  border-radius: 8px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
`;

const Title = styled.p`
  font-size: 38px;
  font-weight: bold;
`;
const ForgotPassword = styled.p`
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;

const Singup = styled.p`
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.2s ease-in-out;
  :hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;

const Text = styled.p`
  font-size: 12px;
  text-align: center;
`;

const InputWrapper = styled.div`
  height: auto;
  width: 80%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Login = props => {

  const [data,setData] = useState({
    email:'',
    password:''
  })

  const DataUpdate = (event,property) =>{
    setData({...data,[property]:event.target.value})
  }

  const LoginHandler = () =>{
          axios
            .post("http://localhost:4000/Login", data)
            .then(response => {
              SetToken(response.data);
              props.history.push('/User')

            })
            .catch(err => {
              console.log(err.response);
            });}

  return (
    <Container>
      <Form>
        <Title>Login</Title>
        <InputWrapper>
          <Input
            label="Email:"
            placeholder="Type your Email"
            icon={<LoginIcon />}
            inputType="text"
            onChange={event => DataUpdate(event, "email")}
          />
          <Input
            label="Password:"
            placeholder="Type your password"
            icon={<PasswordIcon />}
            inputType="password"
            onChange={event => DataUpdate(event, "password")}
          />
          <Link to="/Reset" style={{ alignSelf: "flex-end" }}>
            <ForgotPassword>Forgot password ?</ForgotPassword>
          </Link>
        </InputWrapper>
        <Button text="Login" onClick={LoginHandler} />
        <div>
          <Text>Don't have account yet ?</Text>
          <Link to="/Signup">
            <Singup>Singup</Singup>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login
