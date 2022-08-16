import useFetch from "../../hooks/useFetchUser";
import useFetchImgBuy from "../../hooks/useFetchImgBuy";
import BarNav from "./Nav";
import "../Styled/content.css";
import "../Styled/article.css";

const PurchasedImg = () => {
  const { data } = useFetch();
  const imgs = useFetchImgBuy();

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
  };

  const img = imgs.map((p) => (
    <div key={p.id_img}>
      <article>
        <img src={p.url_img} />
        <button className="btn" onClick={() => handleDownload(p.url_img)}>
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
