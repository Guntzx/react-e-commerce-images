import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetchUser";
import BarNav from "./Nav";
import "../Styled/content.css";
import "../Styled/article.css";

const queryParams = new URLSearchParams(window.location.search);
const status = queryParams.get("status");
const amount = queryParams.get("amount");
const date = queryParams.get("date");
const img_url = queryParams.get("img_url");
const img_id = queryParams.get("img_id");

const Status = () => {
  const navigate = useNavigate()
  const { data } = useFetch();

  const handleDownload = (src) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const a = document.createElement("a");
      a.download = "download.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  }

  return (
    <>
      <BarNav />
      <div className="containerLabel">
        <label className="label">Detalles de pago {data}</label>
      </div>
      <div className="containerPAY">
        <div className="centerPAY">
          <div key={img_id}>
            <article>
              <h3>Felicitaciones, ya compraste tu imagen</h3>
              <img src={img_url} />
              <p>Estado de la compra: {status}</p>
              <p>Monto de la compra: {amount}</p>
              <p>Fecha de la compra: {date}</p>
              <button
              className="btn"
              onClick={() =>
                handleDownload(img_url)
              }
            >
              Descargar Imagen
            </button>
            <button
              className="btn"
              onClick={() => navigate('/Home')}
            >
              Inicio
            </button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
