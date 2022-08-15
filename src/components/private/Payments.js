import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetchUser";
import BarNav from "./Nav";
import "../Styled/content.css";
import "../Styled/article.css";

const Payments = () => {
  const { data } = useFetch();
  const { state } = useLocation();
  const { tokenT, url, id_img, img_url, img_description, amount } = state;

  return (
    <>
      <BarNav />
      <div className="containerLabel">
        <label className="label">Detalles de pago {data}</label>
      </div>

      <div className="containerPAY">
        <div className="centerPAY">
          <div key={id_img}>
            <article>
              <img src={img_url} />
              <p>{[img_description].join(" - ")}</p>
              <p>Precio: {amount}</p>
              <form method="post" action={url}>
                <input type="hidden" name="token_ws" value={tokenT} />
                <button className="btn" type="submit">
                  Pagar
                </button>
              </form>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
