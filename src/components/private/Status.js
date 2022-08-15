import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetchUser";
import BarNav from "./Nav";
import "../Styled/content.css";
import "../Styled/article.css";

const Status = () => {
  const navigate = useNavigate();
  const { data } = useFetch();


  return (
    <>
      <BarNav />
      <div className="containerLabel">
        <label className="label">Detalles de pago {data}</label>
      </div>
      <button
            type="submit"
            onClick={() => {
              navigate("/Home");
            }}
          >
            Ir al Home
          </button>
      <div className="containerPAY">
        <div className="centerPAY">
          <h1>DETALLES DEL PAGO</h1>
        </div>
      </div>
    </>
  );
};

export default Status;
