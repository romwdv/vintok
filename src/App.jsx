import "./App.css";
import { useState } from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
<<<<<<< HEAD
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("vintok") || null);
=======
import Test from "./Pages/Test";

function App() {
  const [token, setToken] = useState();
  const [userSearch, setUserSearch] = useState("");
  const [dataFetch, setDataFetch] = useState(null);
>>>>>>> develop

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
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route
          path="/test"
          element={<Test dataFetch={dataFetch} userSearch={userSearch} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
