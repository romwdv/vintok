import logo from "../assets/logo.png";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo vintok" />
        <input
          type="text"
          className="search-text"
          placeholder="Rechercher un article ou un membre"
        />
        <div className="nav-header">
          <button className="login">S'incrire | Se connecter</button>
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
