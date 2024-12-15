import { useState, useEffect } from "react";
import axios from "axios";

//----- Import images... ---------//
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState({});
  const [gameByName, setGameByName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [platform, setPlatform] = useState("");
  const [genres, setGenres] = useState("");
  const [filters, setFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [counterPage, setCounterPage] = useState(1);

  const apiKey = "bd481074ca27491f9c3758ede154a2d9";
  try {
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${apiKey}&search=${gameByName}&search_exact=true&search_precise=true&ordering=${sort}&${platform}&${genres}&page=${page}&page_size=40`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };

      fetchData();
    }, [gameByName, sort, platform, genres, page]);
  } catch (error) {
    console.log(error);
  }
  let totalPagesNoInteger = data.count / 40;
  let totalPages = Math.ceil(Number(totalPagesNoInteger));
  //gestion de probleme de limite de pages avec les queries genres et platform
  if ((genres || platform) && totalPages > 250) {
    totalPages = 250;
  }
  return (
    <>
      {isLoading ? (
        <p>Acquisition des données...</p>
      ) : (
        <section className="mainSection">
          <div className="topPartOfHomePage">
            <div className="logoAndTitleInHomePage">
              <img className="pageLogo" src={logo} alt="" />
              <p className="pageTitle">GamePad</p>
            </div>
            <input
              type="text"
              placeholder="Search a Game"
              className="searchBar"
              onChange={(elem) => {
                setGameByName(elem.target.value);
                setFilters(true);
                setCounterPage(1);
                setPage(1);
              }}
            />
            {!gameByName ? (
              <>
                <div style={{ marginBottom: "50px" }}>
                  <p style={{ color: "white" }}>Search {data.count} games</p>
                  <p className="titleGamesHomePage">Most relevance Game</p>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: "white" }}>
                  Search result for {`"${gameByName}"`}
                </p>
                <p style={{ color: "white" }}>{data.count} games</p>
              </>
            )}

            {filters && (
              <>
                <form
                  className="inputsFilters"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  {/* ci dessous les selecteur de types de jeux (action, aventure...) */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    <button
                      style={{ color: "black", width: "135px" }}
                      onClick={() => {
                        setGenres("");
                      }}
                    >
                      All Types
                    </button>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <p style={{ color: "white", marginRight: "20px" }}>
                        Type:
                      </p>
                      <select
                        style={{ marginRight: "90%" }}
                        onChange={(elem) => {
                          setGenres("genres=" + elem.target.value);
                        }}
                        value={Option.value}
                      >
                        <option value="4">Action</option>
                        <option value="3">Adventure</option>
                        <option value="51">Indie</option>
                        <option value="5">RPG</option>
                        <option value="10">Strategy</option>
                        <option value="2">Shooter</option>
                        <option value="40">Casual</option>
                        <option value="14">Simulation</option>
                        <option value="7">Puzzle</option>
                        <option value="11">Arcade</option>
                        <option value="83">Platformer</option>
                        <option value="1">Racing</option>
                        <option value="59">Massively multiplayer</option>
                        <option value="15">Sports</option>
                        <option value="6">Fighting</option>
                        <option value="19">Family</option>
                        <option value="28">Board Games</option>
                        <option value="17">Card</option>
                        <option value="34">Educational</option>
                      </select>
                    </div>
                  </div>
                  {/* ci dessous les selecteur de plateformes */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    <button
                      style={{ color: "black", width: "135px" }}
                      onClick={() => {
                        setPlatform("");
                      }}
                    >
                      All Platforms
                    </button>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <p style={{ color: "white" }}>Platforms:</p>
                      <select
                        style={{ marginRight: "90%" }}
                        onChange={(elem) => {
                          setPlatform("platforms=" + elem.target.value);
                        }}
                        value={Option.value}
                      >
                        <option value="4">PC</option>
                        <option value="187">Playstation 5</option>
                        <option value="18">Playstation 4</option>
                        <option value="1">Xbox One</option>
                        <option value="7">Nintendo switch</option>
                        <option value="3">iOS</option>
                        <option value="21">Android</option>
                        <option value="8">Nintendo 3DS</option>
                        <option value="9">Nintendo DS</option>
                        <option value="13">Nintendo DSi</option>
                        <option value="5">macOS</option>
                        <option value="6">Linux</option>
                        <option value="14">Xbox 360</option>
                        <option value="80">Xbox (old)</option>
                        <option value="16">Playstation 3</option>
                        <option value="15">Playstation 2</option>
                        <option value="27">Playstation 1</option>
                        <option value="19">PS-vita</option>
                        <option value="17">PSP</option>
                        <option value="10">Wii-U</option>
                        <option value="11">Wii</option>
                        <option value="105">GameCube</option>
                        <option value="83">Nintendo 64</option>
                        <option value="24">GameBoy Advance</option>
                        <option value="43">GameBoy Color</option>
                        <option value="26">Game Boy</option>
                        <option value="79">SNES</option>
                        <option value="49">NES</option>
                        <option value="55">Classic Macintosh</option>
                        <option value="41">Apple II</option>
                        <option value="166">Commodore/Amiga</option>
                        <option value="28">Atari 7800</option>
                        <option value="31">Atari 5200</option>
                        <option value="23">Atari 2600</option>
                        <option value="167">Genesis</option>
                        <option value="107">SEGA Saturn</option>
                        <option value="163">SEGA CD</option>
                        <option value="106">Dreamcast</option>
                      </select>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginLeft: "60%" }}
                  >
                    <p style={{ color: "white" }}>Sort by :</p>
                    <select
                      onChange={(elem) => {
                        setSort(elem.target.value);
                      }}
                      value={sort}
                    >
                      <option value=""> Default</option>
                      <option value="name">Name</option>
                      <option value="-released">Date</option>
                      <option value="-rating">Rate</option>
                    </select>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="imagesGames">
            {data.results.map((elem, index) => {
              //ligne ci dessous, permet de reduire la taille du titre du jeux pour qu'il ne depasse pas du cadre
              const titleOfGame = elem.name.slice(0, 32);
              console.log(titleOfGame);
              const game = elem.id;
              return (
                <>
                  {" "}
                  {elem.name && !gameByName && (
                    <Link key={index} to={`/game/${game}`} className="linkGame">
                      <img
                        src={elem.background_image}
                        alt="Image Jeu"
                        className="imageGame"
                      />
                      <p className="titleGame">{titleOfGame}</p>
                    </Link>
                  )}
                  {gameByName && (
                    <Link key={index} to={`/game/${game}`} className="linkGame">
                      <img
                        src={elem.background_image}
                        alt="Image Jeu"
                        className="imageGame"
                      />
                      <p className="titleGame">{titleOfGame}</p>
                    </Link>
                  )}
                </>
              );
            })}
          </div>
          <div className="pagination">
            {counterPage > 1000 && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page - 1000);
                  setCounterPage(counterPage - 1000);
                }}
              >
                -1000
              </button>
            )}
            {counterPage > 100 && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page - 100);
                  setCounterPage(counterPage - 100);
                }}
              >
                -100
              </button>
            )}
            {counterPage > 10 && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page - 10);
                  setCounterPage(counterPage - 10);
                }}
              >
                -10
              </button>
            )}
            {page > 1 && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page - 1);
                  setCounterPage(counterPage - 1);
                }}
              >
                Previous page
              </button>
            )}

            <p style={{ color: "white" }}>
              {counterPage}/{totalPages}
            </p>
            {counterPage !== totalPages && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page + 1);
                  setCounterPage(counterPage + 1);
                }}
              >
                Next page
              </button>
            )}
            {counterPage < totalPages - 10 && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page + 10);
                  setCounterPage(counterPage + 10);
                }}
              >
                +10
              </button>
            )}
            {counterPage < totalPages - 100 && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page + 100);
                  setCounterPage(counterPage + 100);
                }}
              >
                +100
              </button>
            )}
            {counterPage < totalPages - 1000 && (
              <button
                className="paginationButtons"
                onClick={() => {
                  setPage(page + 1000);
                  setCounterPage(counterPage + 1000);
                }}
              >
                +1000
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default Home;
