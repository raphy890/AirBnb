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


  // const [spotId] = useState(id);
  // const [userId] = useState(currentUser.id);
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
    history.push(`/spots/${spotId}`);

    const payload = {
      spotId,
      // userId,
      review,
      stars,
    };

    const createdReview = dispatch(thunkCreateReview(payload));

    if (createdReview) {
      history.push(`/spots/${spotId}`);
    }
  };


  return (
    <section className='login-title-container-review'>
      <form className="login-form-review" onSubmit={handleSubmit}>
        <div className="create-review-header-container">
          <h1 className="create-review-header">How was your stay?</h1>
        </div>
        <div className="create-review-errors">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
        <div className="modal-body">
          <label className="create-review-label">
            Review
            <div className="create-review-input-container">
              <input
                className="login-input"
                type="string"
                placeholder="Write your review..."
                required
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
                required
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
          </label>
        </div>
          <button
            className="login-button-review "
            type="submit"
            disabled={errors.length ? true : false}
          >
            Submit Review
          </button>

      </form>
    </section>
  );
}

export default CreateReviewForm;
