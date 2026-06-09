import "./App.css";
import { useState } from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Publish from "./Pages/Publish";
import Paiment from "./Pages/Paiment";

function App() {
  const [token, setToken] = useState();
  const [userSearch, setUserSearch] = useState("");
  const [dataFetch, setDataFetch] = useState([]);
  const [publishNotLogged, setPublishNotLogged] = useState(false);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        setUserSearch={setUserSearch}
        userSearch={userSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dataFetch={dataFetch}
              setDataFetch={setDataFetch}
              userSearch={userSearch}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          publishNotLogged={publishNotLogged}
          setPublishNotLogged={setPublishNotLogged}
          element={<Signup setToken={setToken} />}
        />
        <Route
          path="/login"
          element={
            <Login
              publishNotLogged={publishNotLogged}
              setPublishNotLogged={setPublishNotLogged}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/publish"
          setPublishNotLogged={setPublishNotLogged}
          element={<Publish />}
        />
        <Route path="/paiement" element={<Paiment token={token} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
