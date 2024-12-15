import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Game = ({ token }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataSameGame, setDataSameGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageFav, setImageFav] = useState("");
  const [titleFav, setTitleFav] = useState("");
  const [gameIdFav, setGameIdFav] = useState("");
  const apiKey = "bd481074ca27491f9c3758ede154a2d9";
  const [errorMessage, setErrorMessage] = useState("");
  const [favButtonState, setFavButtonState] = useState(false);

  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${apiKey}`
        );

        setData(response.data);
        setImageFav(data.background_image);
        setTitleFav(data.name);
        setGameIdFav(data.id);
        console.log(response.data);
        const response2 = await axios.get(
          `https://api.rawg.io/api/games/${id}/game-series?key=${apiKey}`
        );
        setDataSameGame(response2.data);
        setIsLoading(false);
        console.log(response2.data);
      };
      fetchData();
    }, [id, data.background_image, data.name, data.id]);
  } catch (error) {
    console.log(error);
  }
  const handleFavorite = async () => {
    try {
      await axios.post(
        "https://site--backend-gamepad--cszclskmpcqr.code.run/favorite",
        {
          gameId: gameIdFav,
          title: titleFav,
          image: imageFav,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      if (error.status === 409) {
        setErrorMessage("Error, this game is already saved as favorite");
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <p>Acquisition des données</p>
      ) : (
        <>
          <section className="sectionGameInfos">
            <div className="gameInfosAndImg">
              <div className="titleAndImgGame">
                <p className="titleGameInGamePage">{data.name}</p>

                <img
                  src={data.background_image}
                  alt=""
                  className="imageGamePage"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "5%",
                }}
              >
                {token && (
                  <div className="divButtonFav">
                    <button
                      className="buttonFav"
                      onClick={() => {
                        handleFavorite();
                        setFavButtonState(!favButtonState);
                      }}
                    >
                      Add Favorites
                      <span style={{ marginLeft: "5px" }}>
                        <FontAwesomeIcon
                          style={{ color: "gold" }}
                          icon="star"
                        />
                      </span>
                    </button>
                    {favButtonState && (
                      <>
                        {errorMessage ? (
                          <p style={{ color: "red" }}>{errorMessage}</p>
                        ) : (
                          <p style={{ color: "green" }}>
                            Game saved as Favorite
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: "200px" }}>
                  <div className="divInfos">
                    <p className="titleOfInfoGame">Platforms</p>
                    {data.platforms.map((elem, index) => {
                      return <p key={index}>{elem.platform.name}</p>;
                    })}
                  </div>
                  <div className="divInfos">
                    <p className="titleOfInfoGame">Genre</p>
                    {data.genres.map((elem, index) => {
                      return <p key={index}>{elem.name}</p>;
                    })}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "200px" }}>
                  <div className="divInfos">
                    <p className="titleOfInfoGame">Released date</p>
                    <p>{data.released}</p>
                  </div>
                  <div className="divInfos">
                    <p className="titleOfInfoGame">Developer</p>
                    {data.developers.map((elem, index) => {
                      return <p key={index}>{elem.name}</p>;
                    })}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "200px" }}>
                  <div className="divInfos">
                    <p className="titleOfInfoGame">Publisher(s)</p>
                    {data.publishers.map((elem, index) => {
                      return <p key={index}>{elem.name}</p>;
                    })}
                  </div>
                  <div className="divInfos">
                    <p className="titleOfInfoGame">Age Rating</p>
                    {data.esrb_rating ? (
                      <p>{data.esrb_rating.id}</p>
                    ) : (
                      <p>No age rate !</p>
                    )}
                  </div>
                </div>
                <div className="divDesc">
                  <p className="titleOfInfoGame">About</p>
                  <p className="descGame">{data.description_raw}</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <p className="titleGameLike">Games like {data.name} :</p>
            {!dataSameGame.count ? (
              <p style={{ textAlign: "center", color: "white" }}>
                No Games like {data.name} !
              </p>
            ) : (
              <>
                <div className="divSameGame">
                  {dataSameGame.results.map((elem, index) => {
                    const sameGame = elem.id;

                    return (
                      <>
                        <Link
                          key={index}
                          to={`/game/${sameGame}`}
                          className="sameGameLink"
                        >
                          <img
                            src={elem.background_image}
                            className="imgSameSeriesGames"
                          />
                          <p className="nameSameSeriesGame">{elem.name}</p>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </section>
          <section className="sectionReviews">
            <p className="titleReviews">Reviews</p>
          </section>
        </>
      )}
    </>
  );
};
export default Game;
