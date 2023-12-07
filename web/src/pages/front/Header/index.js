import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  background-color: #3498db;
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
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

  const logout = () => {
    localStorage.removeItem("user")
    navigate('/login')
  }
  return (
    <HeaderContainer>
      <NavList>
        <NavItem href="/">
          <NavIcon src={process.env.PUBLIC_URL + '/logo192.png'} alt=""/>
        </NavItem>
        <NavItem href="/createPost">
          Create post
        </NavItem>
        <NavItem href="/createChannel">
          Create channel
        </NavItem>
        <NavItem href="/search">
          Search
        </NavItem>
      </NavList>
      <div>
        <div>
          <span>Welcome {user.nickname}: </span>
          <span style={{ marginRight: '30px' }}>{user.grade}</span>
          <LogoutButton href="#" onClick={logout}>
            {'logout'}
          </LogoutButton>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
