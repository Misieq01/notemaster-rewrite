import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: space-between;
`;
const Label = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;
const InputWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row-nowrap;
  align-items: center;
  border-bottom: 1px solid rgba(90, 90, 90, 0.5);
  transition: all 0.2s ease-in-out;
`;

const Icon = styled.svg`
  width: 18px;
  height: 18px;
  fill: rgba(90, 90, 90, 0.75);
  margin-right: 10px;
  transition: all 0.2s ease-in-out;
`;

const Input = styled.input`
  width: calc(100% - 40px);
  height: auto;
  font-size: 18px;
  color: rgba(90, 90, 90, 0.8);
  background: none;
  border-radius: 5px;
  padding: 10px 20px 10px 0;
  ::placeholder {
    color: rgba(90, 90, 90, 0.8);
    font-size: 15px;
  }
  :focus {
    color: rgba(0, 0, 0, 1);
  }
`;

const InputComponent = ({
  label,
  icon,
  placeholder,
  inputType,
  value,
  onChange,
  OnBlur
}) => {
  const InputWrapperRef = useRef();
  const IconRef = useRef();

  const FocusHandler = () => {
    InputWrapperRef.current.style.borderBottom =
      "1px solid rgba(90, 90, 90, 1)";
    IconRef.current.style.fill = "rgba(0, 0, 0,1)";
  };

  const BlurHandler = () => {
    InputWrapperRef.current.style.borderBottom =
      "1px solid rgba(90, 90, 90, 0.5)";
    IconRef.current.style.fill = "rgba(90, 90, 90,0.75)";
    if(OnBlur){OnBlur()}
  };

  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper ref={InputWrapperRef}>
        <Icon ref={IconRef}>{icon}</Icon>
        <Input
          placeholder={placeholder}
          onFocus={FocusHandler}
          onBlur={BlurHandler}
          type={inputType}
          onChange={onChange}
          value={value}
        />
      </InputWrapper>
    </Container>
  );
};

export default InputComponent;
