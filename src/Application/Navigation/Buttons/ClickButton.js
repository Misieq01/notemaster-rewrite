import React from "react";

const Button = ({
  svg,
  buttonTitle,
  onClick,
  ...props
}) => {

  return (
    <>
      <button
        className="navigation__wrapper--button"
        title={buttonTitle}
        onClick={onClick}
      >
        <img alt="icon" className="navigation__wrapper--icon" src={svg} />
      </button>
    </>
  );
};

export default Button;
