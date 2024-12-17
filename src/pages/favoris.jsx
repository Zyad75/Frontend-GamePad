import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Favoris = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [titleFavToDel, setTitleFavToDel] = useState("");
  const [toggleFav, setToggleFav] = useState(false);
  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          "https://site--backend-gamepad--cszclskmpcqr.code.run/favoritesOfUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response);
        console.log(response.data);

        setIsLoading(false);
      };
      fetchData();
      deleteFavorite();
    }, [token, titleFavToDel]);
  } catch (error) {
    console.log(error);
  }
  const deleteFavorite = async () => {
    try {
      await axios.post(
        "https://site--backend-gamepad--cszclskmpcqr.code.run/deleteFav",
        {
          title: titleFavToDel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      {!token ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <p
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "5%",
              fontSize: "30px",
              fontWeight: "600",
            }}
          >
            {" "}
            Favorite Page
          </p>
          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <>
              {!data.data ? (
                <p style={{ color: "white" }}>No Favorites !</p>
              ) : (
                <>
                  <div className="allFavs">
                    {data.data.map((elem, index) => {
                      const gameID = elem.gameId;
                      return (
                        <>
                          <div key={index} className="divImgTitleFav">
                            <Link
                              className="linkGameFav"
                              to={`/game/${gameID}`}
                            >
                              <img
                                src={elem.image}
                                alt=""
                                className="imgFavoris"
                              />
                            </Link>

                            <p>{elem.title.slice(0, 32)}</p>
                            <button
                              className="deleteButton"
                              key={index}
                              onClick={() => {
                                setTitleFavToDel(elem.title);
                                deleteFavorite();
                                setToggleFav(!toggleFav);
                              }}
                            >
                              <FontAwesomeIcon icon="fa-solid fa-trash" />
                            </button>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
export default Favoris;
