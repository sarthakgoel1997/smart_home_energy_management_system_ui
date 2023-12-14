import React, {useState, useEffect} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

function isAuthTokenExpired () {
  const expirationTime = localStorage.getItem('expirationTime');

  if (!expirationTime) {
    // Token expiration information is not available
    return true;
  }

  return new Date().getTime() > parseInt(expirationTime, 10);
};

function NavBar () {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [authTokenExpired, setAuthTokenExpired] = useState(isAuthTokenExpired());
    useEffect(() => {
      setAuthTokenExpired(isAuthTokenExpired());
    }, []);

    return (
        <div>
          <Navbar className="navbar navbar-expand-lg" color="dark">
            <NavbarBrand href="/" style={{ color: 'white' }}>Con Edison</NavbarBrand>
            <NavbarToggler onClick={toggle} style={{ backgroundColor: 'white' }}/>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ms-auto" navbar>
                <NavItem>
                  <NavLink href="/policy" style={{ color: 'white' }}>Policy</NavLink>
                </NavItem>

                { !authTokenExpired &&
                  <NavItem>
                    <NavLink href={`/dashboard`} style={{ color: 'white' }}>Dashboard</NavLink>
                  </NavItem>
                }

                <NavItem>
                  <NavLink href="/login" style={{ color: 'white' }}>{authTokenExpired ? 'Login' : 'Logout'}</NavLink>
                </NavItem>

                { authTokenExpired &&
                  <NavItem>
                    <NavLink href="/register" style={{ color: 'white' }}>Register</NavLink>
                  </NavItem>
                }
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
};

export default NavBar;