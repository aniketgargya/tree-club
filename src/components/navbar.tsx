import { useContext, FC } from 'react';
import Link from 'next/link';
import { Nav, Navbar } from 'react-bootstrap';
import { TokenContext } from '../contexts/';

const NavBar: FC = () => {
    const { token, setToken } = useContext(TokenContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link href="/"><a href="navbar-brand">Tree Club</a></Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {
                        token && (
                            <Link href="/create">
                                <a className="nav-link">Create</a>
                            </Link>
                        )
                    }
                    {token ?
                        (
                            <a href="#" className="nav-link " onClick={() => { setToken(null) }}>Sign Out</a>
                        ) :
                        (
                            <Link href="/sign-in">
                                <a className="nav-link">Sign In</a>
                            </Link>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;