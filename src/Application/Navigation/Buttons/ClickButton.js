import React from "react";

const Button = ({
  svg,
  buttonTitle,
  onClick,
  ...props
}) => {

  return (
    <>
      <button className='navigation__button'
        title={buttonTitle}
        onClick={onClick}
      >
        <img alt='icon' src={svg} />
      </button>
    </>
  );
};

export default Button;
