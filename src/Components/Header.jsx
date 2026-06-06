import logo from "../assets/logo.png";
import { IoIosHelpCircleOutline, IoIosSearch } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ setToken, setUserSearch, userSearch }) => {
  const navigate = useNavigate();

  const cookies = Cookies.get("vintok");
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <img src={logo} alt="logo vintok" />
        </Link>
        <div className="search">
          {userSearch && (
            <TiDeleteOutline
              size={28}
              color={"#949494"}
              onClick={() => setUserSearch("")}
            />
          )}
          <input
            type="text"
            className="search-text"
            placeholder="Rechercher un article ou un membre"
            value={userSearch ? userSearch : ""}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <IoIosSearch size={28} color={"#949494"} />
        </div>
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
          <button className="country">
            <Link to={"/test"}>FR</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
