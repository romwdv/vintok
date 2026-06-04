import logo from "../assets/logo.png";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to={"/signup"}>
            <button className="login">S'incrire | Se connecter</button>
          </Link>
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
