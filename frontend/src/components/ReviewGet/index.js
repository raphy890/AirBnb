import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import {thunkGetCurrentReviews,thunkDeleteReview} from '../../store/reviews'



export default function GetSpotReviews({sessionUser}){
  const {spotId} = useParams();
  const spotIdParsed = parseInt(spotId)
  const spot = useSelector(state => (state.spots[spotIdParsed]))
  const allReviews = useSelector(state => state.reviews)
  const getAllReviewArr = Object.values(allReviews)


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
    }, [dispatch,spotId])

    if(!getAllReviewArr.length){
      return null
    }


  return (
  isLoaded && (
    <div>
    <h1>Review Go right Here!!!! ---- {spot.name}</h1>
    <ul>
      {getAllReviewArr.map(review => {
        return (
          <div key={review.id}>
            <span>
            {review.review}
           { sessionUser.id === review.userId && <button onClick={(e)=>deletereview(e, review.id)}>Delete Review</button>}
            </span>
          </div>
        )
      })}
    </ul>
    </div>
  )

)

}
