import React from "react";

const Button = ({
  Icon,
  buttonTitle,
  onClick,
}) => {

  return (
      <button
        className="navigation__wrapper--button"
        title={buttonTitle}
        onClick={onClick}
      >
        <Icon className="navigation__wrapper--icon"/>
      </button>
  );
};

export default Button;
