import useFetch from "../../hooks/useFetchUser";
import useFetchImgBuy from "../../hooks/useFetchImgBuy";
import BarNav from "./Nav";
import "../Styled/content.css";
import "../Styled/article.css";

const PurchasedImg = () => {
  const { data } = useFetch();
  const imgs = useFetchImgBuy();

  const handleDownload = (id) => {
    console.log(id);
  };

  const img = imgs.map((p) => (
    <div key={p.id_img}>
      <article>
        <img src={p.url_img} />
        <button className="btn" onClick={() => handleDownload(p.id_img)}>
          Descargar Imagen
        </button>
      </article>
    </div>
  ));

  return (
    <>
      <BarNav />
      <div className="containerLabel">
        <label className="label">Estas son tus Imagenes compradas {data}</label>
      </div>
      <div className="container">
        <div className="center">
          {imgs.length > 0 ? (
            img
          ) : (
            <label className="label">Aun no compras imagenes</label>
          )}
        </div>
      </div>
    </>
  );
};

export default PurchasedImg;
