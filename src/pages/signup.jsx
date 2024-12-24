import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup = ({ handleConnectedOrNot }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://site--backend-gamepad--cszclskmpcqr.code.run/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      handleConnectedOrNot(response.data.token);
      console.log("ici =>", response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage("adresse déja utilisée");
      } else if (error.response.data.error === "Missing parameters") {
        setErrorMessage("Error, please fill in all fields");
      } else {
        setErrorMessage("Erreur, veuillez réessayer svp !");
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          marginTop: "200px",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
          onSubmit={handleSignup}
        >
          {" "}
          <h1 className="loginTitle">
            Sign Up{" "}
            <span>
              <FontAwesomeIcon
                className="iconLogin"
                icon="fa-solid fa-gamepad"
              />
            </span>
          </h1>
          <input
            className="inputSignupLogin"
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className="inputSignupLogin"
            type="email"
            placeholder="mail@mail.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="inputSignupLogin"
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input className="submitButton" type="submit" value={"S'inscrire"} />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
        <Link className="linkSignUp" to={"/login"}>
          {" "}
          Already registered ? Sign in now !
        </Link>
      </div>
    </>
  );
};
export default Signup;
