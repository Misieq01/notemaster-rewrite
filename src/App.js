import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NoAuthRoute from './Components/NoAuthRoute'
import AuthRoute from './Components/AuthRoute'

import Home from './Homepage/Pages/Home'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import PasswordReset from './Authentication/PasswordReset'
import Main from './App/Main'

const App = () =>{
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <AuthRoute path="/Login" component={Login} />
      <AuthRoute path="/Signup" component={Signup} />
      <AuthRoute path="/Reset" component={PasswordReset} />
      <NoAuthRoute path="/User" component={Main} />
    </Router>
  );
}

export default App;
