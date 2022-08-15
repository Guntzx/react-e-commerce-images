import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Formik, Form, Field } from "formik";
import useFetch from "../../hooks/useFetchUser";
import useFetchImg from "../../hooks/useFetchImg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../Styled/content.css";
import "../Styled/article.css";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [statusImg, setStatusImg] = useState("");
  const { data } = useFetch();
  const imgs = useFetchImg();
  const open = (url) => window.open(url);
  const cookies = new Cookies();
  let navigate = useNavigate();
  const precio_random = Math.floor(Math.random() * 100000) + 1001;

  const handleImg = async (id, url, description) => {
    const token = cookies.get("access-token");

    const response = await fetch("http://192.168.100.2:7000/img/save", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img_id: id,
        img_url: url,
        img_description: description,
      }),
    });

    const result = await response.json();

    setStatusImg(result.message);
  };

  const handlePayment = async (id, amount, url_img, img_description) => {
    const token = cookies.get("access-token");
    
    const response = await fetch("http://192.168.100.2:7000/img/buy", {
      method: "POST",
      headers: {
        Authorization: "Bearer "+ token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyOrder: id,
        amount: amount,
        returnUrl: "http://192.168.100.2:7000/confirm/transaction",
        ObjectBuy: url_img
      })
    })

    const result = await response.json();

    navigate("/Payments", { state: {tokenT: result.token, url: result.url, id_img: id, img_url: url_img, img_description: img_description, amount: amount} })
  }

  const handleSubmit = async (values) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?per_page=50&query=${values.search}`,
      {
        headers: {
          Authorization:
            "Your Auth",
        },
      }
    );

    const data = await response.json();
    setPhotos(data.results);
  };

  const img = photos.map((photo) => (
    <div key={photo.id}>
      <article>
        <img src={photo.urls.regular} onClick={() => open(photo.links.html)} />
        <p>{[photo.description, photo.alt_description].join(" - ")}</p>
        <label className="label">Precio: ${precio_random}</label>
      </article>
      <button
        className="btn"
        onClick={() =>
          handleImg(photo.id, photo.urls.regular, photo.description)
        }
      >
        Guardar
      </button>
      <button
        className="btn"
        onClick={() =>
          handlePayment(photo.id, precio_random, photo.urls.regular, photo.description)
        }
      >
        Comprar
      </button>
    </div>
  ));

  const imgRandom = imgs.map((rPhotos) => (
    <div key={rPhotos.id}>
      <article>
        <img
          src={rPhotos.urls.regular}
          onClick={() => open(rPhotos.links.html)}
        />
        <p>{[rPhotos.description, rPhotos.alt_description].join(" - ")}</p>
        <label className="label">Precio: ${precio_random}</label>
      </article>
      <button
        className="btn"
        onClick={() =>
          handleImg(rPhotos.id, rPhotos.urls.regular, rPhotos.description)
        }
      >
        Guardar
      </button>
      <button
        className="btn"
        onClick={() =>
          handlePayment(rPhotos.id, precio_random, rPhotos.urls.regular, rPhotos.description)
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
            <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
              <Form className="d-flex">
                <Field
                  name="search"
                  placeholder="Lluvia, paisaje, etc.."
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
        <label className="label">Bienvenida/o {data}</label>
      </div>

      <div className="container">
        <div className="center">
          <label> {statusImg}</label>
          {photos.length > 0 ? img : imgRandom}
        </div>
      </div>
    </>
  );
};

export default Home;