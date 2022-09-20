import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { thunkCreateReview } from "../../store/reviews";


function CreateReviewForm() {
  const history = useHistory();
  const { spotId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);




  useEffect(() => {
    const newErrors = [];

    if (review.length <= 0) {
      newErrors.push("Please write a review.");
    }
    if (stars < 1 || stars > 5) {
      newErrors.push("Rating must be an integer from 1 to 5.");
    }
    setErrors(newErrors);
  }, [review, stars]);

  if (spot?.Owners?.id === currentUser.id) {
    <Redirect to={`/spots/${spot.id}`} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true)

    if (errors.length > 0){
      return;
    }

    history.push(`/spots/${spotId}`);

    const payload = {
      spotId,
      review,
      stars,
    };

    const createdReview = dispatch(thunkCreateReview(payload));

    if (createdReview) {
      history.push(`/spots/${spotId}`);
    }
  };

  const errorList = (errors.map((error) => (
    <div className="create-review-errors" key={error}>{error}</div>
  )))

  return (
    <section className='login-title-container-review'>
      <form className="login-form-review" onSubmit={handleSubmit}>
        <div className="create-review-header-container">
          <h1 className="create-review-header">How was your stay?</h1>
        </div>

        <ul className="create-review-errors">
        {isSubmitted && errorList}
        </ul>
        <div className="modal-body">
          <label className="create-review-label">
            Review
            <div className="create-review-input-container">
              <input
                className="login-input"
                type="string"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </label>
          <label className="create-review-label">
            Star Rating
            <div>
              <input
                className="login-input"
                type="integer"
                placeholder="1 - 5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
          </label>
        </div>
          <button
            className="login-button-review "
            type="submit"
            disabled={isSubmitted && errors.length>0}
          >
            Submit Review
          </button>

      </form>
    </section>
  );
}

export default CreateReviewForm;
