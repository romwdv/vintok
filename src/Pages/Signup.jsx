import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ token, setToken }) => {
  const location = useLocation();
  const from = location.state?.from || { pathname: "/", state: null };
  const [redirectTo, setRedirectTo] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (token) {
    return <Navigate to={from.pathname} replace state={from.state} />;
  }

  return (
    <section className="container">
      <div>
        <form
          onSubmit={async (ev) => {
            try {
              ev.preventDefault();
              const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/signup`,
                {
                  email,
                  username,
                  password,
                  newsletter: true,
                },
              );
              setToken(response.data.token);
              Cookies.set("vintok", response.data.token);
              setRedirectTo({ pathname: from.pathname, state: from.state });
            } catch (error) {
              alert(error.response);
            }
          }}
        >
          <h2>Inscrit-toi avec ton email</h2>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(event) => setUsername(event.target.value)}
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
          Tu as déjà un compte ?{" "}
          <Link to="/login" state={location.state}>
            <span>Se connecter</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
