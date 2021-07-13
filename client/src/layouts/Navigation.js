import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Codechool</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
      <Navbar.Collapse id="main-menu">
        <Nav className="mr-auto">
          <Nav.Link>포스트 작성하기</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>가입하기</Nav.Link>
          <NavDropdown title="Mayer Jeon" id="menu-dropdown">
            <NavDropdown.Item>포스트</NavDropdown.Item>
            <NavDropdown.Item>로그아웃</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
