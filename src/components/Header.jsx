import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = ({ token, handleConnectedOrNot }) => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className="divElementsHeader">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="buttonLogo"
          >
            <img className="logo" src={Logo} alt="LOGO" />
            <p className="logoTitle">GamePad</p>
          </button>
          <div className="divLinksHeader">
            <Link className="headerLinks" to={"/favoris"}>
              Favorites
            </Link>
            <Link className="headerLinkLogos" to={"/favoris"}>
              <FontAwesomeIcon
                icon="fa-solid fa-bookmark"
                className="logoHeader"
              />
            </Link>
            {!token ? (
              <>
                <Link className="headerLinks" to={"/login"}>
                  Log In
                </Link>
                <Link className="headerLinkLogos" to={"/login"}>
                  <FontAwesomeIcon
                    className="logoHeader"
                    icon="fa-solid fa-user"
                  />
                </Link>
              </>
            ) : (
              <>
                <button
                  className="logoutButton"
                  onClick={() => {
                    handleConnectedOrNot(null);
                    //permet de faire :
                    // Cookies.remove("user-token");
                    //setToken(null);
                    navigate("/");
                  }}
                >
                  {" "}
                  Log Out{" "}
                </button>
                <button
                  className="logoutLogo"
                  onClick={() => {
                    handleConnectedOrNot(null);
                    //permet de faire :
                    // Cookies.remove("user-token");
                    //setToken(null);
                    navigate("/");
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
