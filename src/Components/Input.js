import React, { useRef } from "react";

const InputComponent = ({
  label,
  icon,
  placeholder,
  inputType,
  value,
  onChange,
  error
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
  };

  return (
    <div className='input__container'>
      <p className='input__label'>{label}</p>
      <div className='input__wrapper' ref={InputWrapperRef}>
        <img className='input__wrapper--icon' ref={IconRef} src={icon} alt='icon'/>
        <input className='input__wrapper--input'
          placeholder={placeholder}
          onFocus={focusHandler}
          onBlur={blurHandler}
          type={inputType}
          onChange={onChange}
          value={value}
        />
      </div>
      <span className='input__error'>{error}</span>
    </div>
  );
};

export default InputComponent;
