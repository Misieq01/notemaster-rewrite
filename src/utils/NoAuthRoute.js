import React from "react";
import { Redirect, Route } from "react-router-dom";
import { GetToken } from "./tokenHandler";

const NoAuthRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        GetToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/Login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default NoAuthRoute