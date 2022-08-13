import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Formik, Form, Field } from "formik";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const NavScroll = () => {
    const [search, setSearch] = useState("");
  const cookies = new Cookies();
  let navigate = useNavigate();

  const handleHome = () => {
    navigate("/Home", { replace: true });
  };

  const handleLogin = () => {
    cookies.remove("access-token", { path: "/" });
    navigate("/", { replace: true });
  };

  const handleSave = () => {
    navigate("/Saved", { replace: true });
  };

  const handlePurchased = () => {
    navigate("/Purchased", { replace: true });
  };

  const handleSubmit = (values) => {
    setSearch(values.search);
    
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Nav.Link onClick={handleHome}>Image e-commerce</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={handleHome}>Inicio</Nav.Link>
            <Nav.Link onClick={handleSave}>Imgenes guardadas</Nav.Link>
            <Nav.Link onClick={handlePurchased}>Imgenes compradas</Nav.Link>
            <Nav.Link onClick={handleLogin}>Cerrar sesion</Nav.Link>
          </Nav>
          <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
            <Form className="d-flex">
              <Field
                name="search"
                //placeholder="Lluvia, paisaje, etc.."
                className="me-2"
              />
              <Button type="submit" variant="outline-success">Buscar</Button>
            </Form>
          </Formik>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavScroll;
