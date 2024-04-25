import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, NavbarBrand } from 'react-bootstrap'; 

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
      <Container>
        <NavbarBrand >Waiter.app</NavbarBrand>
        <Nav className='d-flex justify-content-end'>
          <Nav.Link as={NavLink} to='/' exact="">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;