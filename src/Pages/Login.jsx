import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return !token ? (
    <section className="container">
      <div>
        <form
          onSubmit={async (ev) => {
            try {
              ev.preventDefault();
              const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/login`,
                {
                  email,
                  password,
                },
              );
              setToken(response.data.token);
              Cookies.set("vintok", response.data.token);
              console.log(response.data);
              navigate("/");
            } catch (error) {
              alert(error.response);
            }
          }}
        >
          <h2>Se connecter</h2>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input type="submit" name="submit" id="submit" value="Continuez" />
        </form>
        <p>
          Tu n'as pas de compte ?
          <Link to={"/signup"}>
            <span>S'inscrire</span>
          </Link>
        </p>
      </div>
    </section>
  ) : (
    <Navigate to="/" />
  );
};

export default Login;
