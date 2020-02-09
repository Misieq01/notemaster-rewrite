import React, { useRef } from "react";

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

  const focusHandler = () => {
    InputWrapperRef.current.style.borderBottom =
      "1px solid rgba(90, 90, 90, 1)";
    IconRef.current.style.opacity = 1;
  };

  const blurHandler = () => {
    InputWrapperRef.current.style.borderBottom =
      "1px solid rgba(90, 90, 90, 0.5)";
    IconRef.current.style.opacity = 0.6;
    if(OnBlur){OnBlur()}
  };

  return (
    <div className='input__container'>
      <p className='input__label'>{label}</p>
      <div className='input__inputWrapper' ref={InputWrapperRef}>
        <img className='input__icon' ref={IconRef} src={icon} alt='icon'/>
        <input className='input__input'
          placeholder={placeholder}
          onFocus={focusHandler}
          onBlur={blurHandler}
          type={inputType}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default InputComponent;
