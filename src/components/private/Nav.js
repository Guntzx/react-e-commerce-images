import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

function NavScroll() {
    const cookies = new Cookies();
  let navigate = useNavigate();
  const handleLogin = () => {
    cookies.remove("access-token", { path: "/" });
    navigate("/", { replace: true });
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/Home">Image e-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/Home">Inicio</Nav.Link>
            <Nav.Link href="#action2">Imgenes guardadas</Nav.Link>
            <Nav.Link href="#action3">Imgenes compradas</Nav.Link>
            <Nav.Link onClick={handleLogin}>Cerrar sesion</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="lluvia, navidad, etc.."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;