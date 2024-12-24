import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const AddReview = ({ token }) => {
  const navigate = useNavigate();
  const [titleReview, setTitleReview] = useState("");
  const [descReview, setDescReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitReviewState, setSubmitReviewState] = useState(false);
  const { gameID } = useParams();

  const handleAddReview = async () => {
    try {
      await axios.post(
        "https://site--backend-gamepad--cszclskmpcqr.code.run/review",
        {
          gameId: gameID,
          title: titleReview,
          review: descReview,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/game/${gameID}`);
    } catch (error) {
      console.log(error);
      if (error.status === 409) {
        setErrorMessage("Erreur, you've already wrote a review for this game");
      } else {
        setErrorMessage("Missing parameters");
      }
    }
  };

  return (
    <div className="divAddReviewPage">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddReview();
          setSubmitReviewState(!submitReviewState);
        }}
        className="formAddReview"
      >
        <input
          className="titleReviewInput"
          type="text"
          placeholder="Title of your review"
          value={titleReview}
          onChange={(elem) => {
            setTitleReview(elem.target.value);
          }}
        />
        <input
          className="descReviewInput"
          type="text"
          placeholder="Write your opinions about this game"
          value={descReview}
          onChange={(elem) => {
            setDescReview(elem.target.value);
          }}
        />
        <input type="submit" value="Submit Review" className="submitReview" />
        {submitReviewState && (
          <>
            {errorMessage ? (
              <p style={{ color: "red", marginLeft: "10%" }}>{errorMessage}</p>
            ) : (
              <p style={{ color: "green", marginLeft: "10%" }}>
                Review submitted
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};
export default AddReview;
