import { useNavigate } from "react-router-dom";
import NavScroll from "./Nav";

const SaveImg = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/Home", { replace: true });
  };
  return (
    <>
      <NavScroll />
      <div>
        TUS IMG GUARDADAS
        <form onSubmit={handleHome}>
          <button type="submit">Volver al Home o Inicio</button>
        </form>
      </div>
    </>
  );
};

export default SaveImg;
