import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useFetch from "../../hooks/useFetchUser";
import useFetchImgGet from "../../hooks/useFetchImgGet";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Styled/content.css";
import "../Styled/article.css";

const SaveImg = () => {
  const { data } = useFetch();
  const imgs = useFetchImgGet();
  const cookies = new Cookies();
  let navigate = useNavigate();

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
  };

  const img = imgs.map((p) => (
    <div key={p.img_id}>
      <article>
        <img
          src={p.img_url}
        />
        <p>{[p.img_description].join(" - ")}</p>
      </article>
      <button
        className="btn"
        onClick={() =>
          handleImg(p.img_id, p.img_url, p.img_description)
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="containerLabel">
        <label className="label">Estas son tus Imagenes guardadas {data}</label>
      </div>

      <div className="container">
        <div className="center">
          {imgs.length > 0 ? img : <label className="label">Aun no tienes imgenes guardadas</label>}
        </div>
      </div>
    </>
  );
};

export default SaveImg;