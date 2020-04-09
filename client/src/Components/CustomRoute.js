import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../utils/tokenHandler";



const CustomRoute = ({
  component: Component,
  redirectPath,
  isPrivate = false,
  ...rest
}) => {
  const token = isPrivate ? getToken() : !getToken();

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default CustomRoute;
