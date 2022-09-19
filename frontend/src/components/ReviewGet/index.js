import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetCurrentReviews, thunkDeleteReview } from '../../store/reviews'
import icon from '../Navigation/images/icon.svg'
import {reviewCss} from './ReviewGet.css'



export default function GetSpotReviews({ sessionUser }) {
  const { spotId } = useParams();
  const spotIdParsed = parseInt(spotId)
  const spot = useSelector(state => (state.spots[spotIdParsed]))
  const allReviews = useSelector(state => state.reviews)
  const getAllReviewArr = Object.values(allReviews)
  // console.log(sessionUser) // email, id, username

  // console.log(spotId)
  // console.log(spotIdParsed)
  // console.log('spot',spot)
  // console.log('allReviews-----', allReviews)//objec empty
  // const [showUpdate, setShowUpdate] = useState(false);
  // const [hasUdpated, setHasUpdate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false)

  const deletereview = (e, id) => {
    e.preventDefault()
    dispatch(thunkDeleteReview(id))
  }


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetCurrentReviews(spotId)).then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  if (!getAllReviewArr.length) {
    return null
  }


  return (
    isLoaded && (
      <div>
        <ul>
          {getAllReviewArr.map(review => {
            return (
              <div className="review-container" key={review.id}>
                <div className="user-container">
                  <div className='box-container'>
                    <img className="review-icon" src={icon} />
                    <div className= "review-name">
                      {review.User.firstName} </div>
                    {!sessionUser ? null : sessionUser.id === review.userId && <button className="delete-button-logo" onClick={(e) => deletereview(e, review.id)}>Delete Review</button>}
                  </div>
                </div>
                <div className='review-holder'>
                  {review.review}
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    )

  )

}
