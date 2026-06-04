import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section className="container">
      <div>
        <form>
          <h2>Inscrit-toi avec ton email</h2>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
          />
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="Nom d'utilisateur"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Mot de passe"
          />
          <input type="submit" name="submit" id="submit" value="Continuez" />
        </form>
      </div>
    </section>
  );
};

export default Signup;
