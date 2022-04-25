import React from "react";
import logo from "../../assets/super.png";
import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useHistory } from "react-router-dom";
import { mobile } from "../../responsive";

const Containter = styled.div`
  height: 60px;
  background: gray;
  background: linear-gradient(90deg, #032f4e, #0a3f58 25%, #388c88);

  ${mobile({ position: "fixed", top: "0", width: "-webkit-fill-available", zIndex: "1" })}
`;

const Wrapper = styled.div`
  padding: 6px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center; // vertical align
`;

const Image = styled.img`
  width: 110px;
  cursor: pointer;
  ${mobile({ width: "115px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ alignItems: "center", justifyContent: "center" })}
`;

const Button = styled.button`
  background-color: #0a3f58;
  color: #ffffff;
  font-size: 15px;
  padding: 7px 10px;
  border: none;
  border-radius: 5px;
  margin-inline: 5px;
  position: relative;
  transition: 2ms;
  cursor: pointer;
  &:hover {
    background-color: #052e41;
  }

  ${mobile({ padding: "7px 3px" })}
`;

const Topbar = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Containter>
      <Wrapper>
        <Left>
          <NavLink to="/">
            <Image className="navbar-img" src={logo} alt="logo" />
          </NavLink>
        </Left>
        {user ? (
          <Right>
            <Button>
              <NavLink
                style={{ color: "#ffffff", textDecoration: "none" }}
                to="/home"
                exact
              >
                Home
              </NavLink>
            </Button>
            <Button>
              <NavLink
                style={{ color: "#ffffff", textDecoration: "none" }}
                to="/team"
                exact
              >
                Team
              </NavLink>
            </Button>
            <Button onClick={handleLogout}>Log out</Button>
          </Right>
        ) : null}
      </Wrapper>
    </Containter>
  );
};

export default Topbar;
