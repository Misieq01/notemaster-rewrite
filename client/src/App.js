import React from "react";
import { HashRouter as Router, Route,Switch } from "react-router-dom";
import CustomRoute from "./Components/CustomRoute";

import { Home, Login, Signup, PasswordReset, Error } from "./Pages/index";
import Main from "./Application/Main";

const App = () => {

  return (
    <Router>
<Switch>
        <Route exact path="/" component={Home} />
        <CustomRoute
          path="/Login"
          redirectPath={"/User/NotesPanel/Notes"}
          component={Login}
        />
        <CustomRoute
          path="/Signup"
          redirectPath={"/User/NotesPanel/Notes"}
          component={Signup}
        />
        <CustomRoute
          path="/Reset"
          redirectPath={"/User/NotesPanel/Notes"}
          component={PasswordReset}
        />
        <CustomRoute
          path="/User"
          redirectPath="/Login"
          component={Main}
          isPrivate={true}
        />
        <Route component={Error} />
</Switch>
    </Router>
  );
};

export default App;
