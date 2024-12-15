//------- Import des packages pour les routes, les states

import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//------- Import du style ------//
import "./App.css";

//import des icons

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faListAlt,
  faStar,
  faTrash,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faListAlt, faStar, faTrash, faGamepad);

//------ Import des composants et des pages ---------//
import Header from "./components/Header";
import Login from "./pages/login";
import Home from "./pages/home";
import Favoris from "./pages/favoris";
import Game from "./pages/game";
import Signup from "./pages/signup";
//import jscookie
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("user-token") || null);
  const handleConnectedOrNot = (token) => {
    if (token === null) {
      Cookies.remove("user-token");
    } else {
      Cookies.set("user-token", token, { expires: 21 });
    }
    setToken(token);
  };
  return (
    <Router>
      <Header token={token} handleConnectedOrNot={handleConnectedOrNot} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/game/:id" element={<Game token={token} />}></Route>
        <Route
          path="/login"
          element={<Login handleConnectedOrNot={handleConnectedOrNot} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup handleConnectedOrNot={handleConnectedOrNot} />}
        ></Route>
        <Route path="/favoris" element={<Favoris token={token} />}></Route>
      </Routes>
      <footer>
        <p>
          2024 © Made with{" "}
          <a href="https://fr.react.dev/" target="blank" className="footer">
            React
          </a>{" "}
          at{" "}
          <a
            href="https://www.lereacteur.io/"
            target="blank"
            className="footer"
          >
            Le Reacteur
          </a>{" "}
          by{" "}
          <a href="https://github.com/Zyad75" target="blank" className="footer">
            Zyad
          </a>
        </p>
      </footer>
    </Router>
  );
}

export default App;
