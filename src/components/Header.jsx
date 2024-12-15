import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

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
            {!token ? (
              <Link className="headerLinks" to={"/login"}>
                Log In
              </Link>
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
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
