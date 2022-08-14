import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Formik, Form, Field } from "formik";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../Styled/content.css";
import "../Styled/article.css";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [randomPhotos, setRandomPhotos] = useState([]);
  const open = (url) => window.open(url);
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

  const handleImg = (id, url, description) => {
    console.log(id, url, description);
  };

  const handleSubmit = async (values) => {
    const img = values.search;

    const response = await fetch(
      `https://api.unsplash.com/search/photos?per_page=50&query=${img}`,
      {
        headers: {
          Authorization:
            "Your code auth here",
        },
      }
    );

    const data = await response.json();
    setPhotos(data.results);
  };

  const img = photos.map((photo) => (
    <div>
      <article key={photo.id}>
        <img src={photo.urls.regular} onClick={() => open(photo.links.html)} />
        <p>{[photo.description, photo.alt_description].join(" - ")}</p>
      </article>
      <button className="btn"
        onClick={() =>
          handleImg(photo.id, photo.urls.regular, photo.description)
        }
      >
        Guardar
      </button>
      <button className="btn"
        onClick={() =>
          handleImg(photo.id, photo.urls.regular, photo.description)
        }
      >
        Comprar
      </button>
    </div>
  ));

  const ImgsRandom = async () => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?per_page=50&query=random`,
      {
        headers: {
          Authorization:
          "Your code auth here",
        },
      }
    );

    const data = await response.json();
    setRandomPhotos(data.results);
  };

  ImgsRandom();

  const imgRandom = randomPhotos.map((rPhotos) => (
    <div>
      <article key={rPhotos.id}>
        <img
          src={rPhotos.urls.regular}
          onClick={() => open(rPhotos.links.html)}
        />
        <p>{[rPhotos.description, rPhotos.alt_description].join(" - ")}</p>
      </article>
      <button className="btn"
        onClick={() =>
          handleImg(rPhotos.id, rPhotos.urls.regular, rPhotos.description)
        }
      >
        Guardar
      </button>
      <button className="btn"
        onClick={() =>
          handleImg(rPhotos.id, rPhotos.urls.regular, rPhotos.description)
        }
      >
        Comprar
      </button>
    </div>
  ));

  return (
    <>
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
                <Button type="submit" variant="outline-success">
                  Buscar
                </Button>
              </Form>
            </Formik>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="containerLabel">
        <label className="label">Bienvenida/o </label>
      </div>
      <div className="container">
        <div className="center">
          {img}
          {imgRandom}
        </div>
      </div>
    </>
  );
};

export default Home;
