import { FC } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const NavBar: FC = () => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Tree Club</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link>Admin Sign In</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default NavBar;