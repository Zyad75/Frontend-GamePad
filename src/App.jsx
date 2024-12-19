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
  faUserSecret,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faEnvelope,
  faKey,
  faListAlt,
  faStar,
  faTrash,
  faGamepad,
  faUserSecret,
  faFileLines
);

//------ Import des composants et des pages ---------//
import Header from "./components/Header";
import Login from "./pages/login";
import Home from "./pages/home";
import Favoris from "./pages/favoris";
import Game from "./pages/game";
import Signup from "./pages/signup";
import AddReview from "./pages/addReview";
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

  // gestion de la page review : on va créer un state initialement vide, qui lors de l'appui
  // sur le bouton  add review, contiendra l'id du jeu pour lequel l'user veut poster une review,
  //ensuite on transmet le state dans la page addreview, afin de pouvoir faire correspondre la review au jeu choisi lors de la requete post(add review)

  //const [gameIdForReview, setGameIdForReview] = useState("");
  // finalement je transmet l'id du jeu en params
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
        <Route
          path="/addReview/:gameID"
          element={<AddReview token={token} />}
        ></Route>
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
