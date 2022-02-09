import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
    const { isAuthenticated } = useAuth0();

    return( 
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="/">Callum McNeil</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Links" id="basic-nav-dropdown">
            <NavDropdown.Item href="/contact">Contact Me</NavDropdown.Item>
            <NavDropdown.Item href="/projects">Projects</NavDropdown.Item>
            <NavDropdown.Item href="/allergen">Allergy Info</NavDropdown.Item>
            <NavDropdown.Item href="/blog">Blog</NavDropdown.Item>
            <NavDropdown.Item href="/retail">Retail Bible</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    
    </Container>

    </Navbar>
    )
}

export default Header;
