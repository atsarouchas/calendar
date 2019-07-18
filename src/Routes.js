import React from "react";
import { Route, Router } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Callback from "./components/CallBack";
import Auth from "./auth/Auth";
import history from "./history";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes = () => {
  return (
    <Router history={history} component={Login}>
      <div>
        <Route path="/" render={props => <Login auth={auth} {...props} />} />
        <Route path="/home" render={props => <Main auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback />;
          }}
        />
      </div>
    </Router>
  );
};

export default Routes;
