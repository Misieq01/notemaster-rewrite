import React from "react";
import { Redirect, Route } from "react-router-dom";
import { GetToken } from "../utils/tokenHandler";

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        GetToken() ? (
          <Redirect
            to={{ pathname: "/User/NotesPanel", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
