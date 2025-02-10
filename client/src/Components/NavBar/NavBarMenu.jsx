import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavBarMenu({ user }) {
  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand href="/">Puppy-World</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/questions">Questions</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user && <div>Welcome, {user.username}!</div>}
      </Container>
    </Navbar>
  );
}
