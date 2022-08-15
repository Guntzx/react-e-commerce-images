import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Styled/content.css";
import "../Styled/article.css";

const BarNav = () => {
  const cookies = new Cookies();
  let navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link
              onClick={() => {
                navigate("/Home");
              }}
            >
              Image e-commerce
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                onClick={() => {
                  navigate("/Home");
                }}
              >
                Inicio
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/Saved");
                }}
              >
                Imagenes guardadas
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/Purchased");
                }}
              >
                Imagenes compradas
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  cookies.remove("access-token", { path: "/" });
                  navigate("/", { replace: true });
                }}
              >
                Cerrar sesion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BarNav;