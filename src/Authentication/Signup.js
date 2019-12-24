import React,{useState} from "react";
import styled from "styled-components";
import { Link,Redirect } from "react-router-dom";
import axios from 'axios'
import {SetToken} from '../utils/tokenHandler'

import Input from "./InputComponent";
import Button from "./ButtonComponent";

import { ReactComponent as PasswordIcon } from "../Icons/Auth/password.svg";
import { ReactComponent as EmailIcon } from "../Icons/Auth/email.svg";
import { ReactComponent as UserIcon } from "../Icons/Auth/user-info.svg";

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
  height: 720px;
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

const Login = styled.p`
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

const SignUp = props => {

  const [data,setData] = useState({
    firstName:'',
    lastName:'',
    email: '',
    password:'',
    passwordConf: ''
  });


  const DataUpdate = (event,property) =>{
    setData({...data, [property]: event.target.value});
  }

  const SignUpHandler = ()=>{
    const newData = {...data}
    delete newData.passwordConf


    if(data.password === data.passwordConf){
      axios.post("http://localhost:4000/Signup",newData).then(response=>{
        SetToken(response.data)
        props.history.push("/User/NotesPanel");
      }).catch(err=>{
        console.log(err.response)
      });
    }
  }

  return (
    <Container>
      <Form>
        <Title>SignUp</Title>
        <InputWrapper>
          <Input
            label="First name:"
            placeholder="Type your first name"
            icon={<UserIcon />}
            inputType="text"
            onChange={event => DataUpdate(event, "firstName")}
          />
          <Input
            label="Last name:"
            placeholder="Type your last name"
            icon={<UserIcon />}
            inputType="text"
            onChange={event => DataUpdate(event, "lastName")}
          />
          <Input
            label="Email:"
            placeholder="It will be also your login"
            icon={<EmailIcon />}
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
          <Input
            label="Confirm password:"
            placeholder="Retype your password"
            icon={<PasswordIcon />}
            inputType="password"
            onChange={event => DataUpdate(event, "passwordConf")}
          />
        </InputWrapper>
        <Button text="SignUp" onClick={SignUpHandler}/>
        <div>
          <Text>Already have account ?</Text>
          <Link to="/Login">
            <Login>Login</Login>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
