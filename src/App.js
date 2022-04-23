import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "./components/topbar/Topbar";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import Team from "./pages/team/Team";
import Details from "./pages/detail/Details";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Topbar />
      <>
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute path={"/home"} exact component={Home} />
          <PrivateRoute path={"/team"} exact component={Team} />
          <PrivateRoute path={"/details/:id"} exact component={Details} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
