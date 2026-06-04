import logo from "../assets/logo.png";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  const cookies = Cookies.get("vintok");
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <img src={logo} alt="logo vintok" />
        </Link>
        <input
          type="text"
          className="search-text"
          placeholder="Rechercher un article ou un membre"
        />
        <div className="nav-header">
          {!cookies && (
            <Link to={"/signup"}>
              <button className="login">S'incrire | Se connecter</button>
            </Link>
          )}
          {cookies && (
            <button
              className="logout"
              onClick={() => {
                Cookies.remove("vintok");
                setToken(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          )}
          <button className="sell-article">Vends tes articles</button>
          <button className="help">
            <IoIosHelpCircleOutline size={30} />
          </button>
          <button className="country">FR</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
