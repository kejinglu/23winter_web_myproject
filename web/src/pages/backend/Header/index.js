import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  background-color: #000;
  color: #fff;
`;

const NavIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  vertical-align: middle;
`;

const NavList = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled.a`
  margin-right: 20px;
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("user")
        navigate('/login')
    }
    return (
        <HeaderContainer>
            <NavList>
                <NavItem href="/user">
                    <NavIcon src={process.env.PUBLIC_URL + '/logo192.png'} alt=""/>
                </NavItem>
                <NavItem href="/user">
                    user
                </NavItem>
                <NavItem href="/post">
                    post
                </NavItem>
                <NavItem href="/channel">
                    channel
                </NavItem>
                <NavItem href="/comment">
                    comment
                </NavItem>
            </NavList>
            <LogoutButton href="#" onClick={logout}>
                logout
            </LogoutButton>
        </HeaderContainer>
    );
};

export default Header;
