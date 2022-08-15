import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useFetch from "../../hooks/useFetchUser";
import useFetchImgGet from "../../hooks/useFetchImgGet";
import BarNav from "./Nav";
import "../Styled/content.css";
import "../Styled/article.css";

const SaveImg = () => {
  const { data } = useFetch();
  const imgs = useFetchImgGet();
  const cookies = new Cookies();
  let navigate = useNavigate();
  const precio_random = Math.floor(Math.random() * 100000) + 1001;

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

    //console.log(result)

    navigate("/Payments", { state: {tokenT: result.token, url: result.url, id_img: id, img_url: url_img, img_description: img_description, amount: amount} })
  }

  const img = imgs.map((p) => (
    <div key={p.img_id}>
      <article>
        <img
          src={p.img_url}
        />
        <p>{[p.img_description].join(" - ")}</p>
        <label className="label">Precio: ${precio_random}</label>
      </article>
      <button
        className="btn"
        onClick={() =>
          handlePayment(p.img_id, precio_random, p.img_url, p.img_description)
        }
      >
        Comprar
      </button>
    </div>
  ));

  return (
    <>
      <BarNav />
      <div className="containerLabel">
        <label className="label">Estas son tus Imagenes guardadas {data}</label>
      </div>

      <div className="container">
        <div className="center">
          {imgs.length > 0 ? img : <label className="label">Aun no tienes imagenes guardadas</label>}
        </div>
      </div>
    </>
  );
};

export default SaveImg;