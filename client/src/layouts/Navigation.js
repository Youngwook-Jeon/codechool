import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";

const Navigation = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to={"/"}>
        Codechool
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
      <Navbar.Collapse id="main-menu">
        <Nav className="mr-auto">
          {loggedIn && <Nav.Link as={NavLink} to={"/newpost"}>포스트 작성하기</Nav.Link>}
        </Nav>
        <Nav>
          {!loggedIn ? (
            <React.Fragment>
              <Nav.Link as={NavLink} to={"/signup"}>가입하기</Nav.Link>
              <Nav.Link as={NavLink} to={"/signin"}>
                로그인
              </Nav.Link>
            </React.Fragment>
          ) : (
            <NavDropdown title={user.sub} id="menu-dropdown">
              <NavDropdown.Item as={NavLink} to={"/posts"}>내 포스트</NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(logoutUser())}>로그아웃</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
