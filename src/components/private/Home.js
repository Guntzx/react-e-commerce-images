import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Home = () => {
    const cookies = new Cookies();
    let navigate = useNavigate()
    const handleLogin = () => {
        cookies.remove('access-token', {path: '/'})
        navigate("/", {replace: true})
    }   
  return (
    <div>
      <h1> ESte es el home</h1>
      <button type="submit" onClick={handleLogin}>ir a login</button>
    </div>
  );
};

export default Home;
