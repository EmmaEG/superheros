import React from "react";
import "./topbar.css";
import logo from "../../assets/super.png";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useHistory } from "react-router-dom";

const Topbar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light text-center sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img className="navbar-img" src={logo} alt="logo" />
        </NavLink>
        {user ? (
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        ) : null}

        {user ? (
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav d-block ms-auto">
              <>
                <NavLink
                  className="btn btn-outline-light mx-1"
                  to="/home"
                  exact
                >
                  Home
                </NavLink>
                <NavLink
                  className="btn btn-outline-light mx-1"
                  to="/team"
                  exact
                >
                  Team
                </NavLink>
              </>

              <button
                className="btn btn-outline-light mx-1"
                onClick={handleLogout}
              >
                Log out
              </button>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Topbar;
