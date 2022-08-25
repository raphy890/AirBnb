import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import {thunkGetCurrentReviews} from '../../store/reviews'


export default function GetSpotReviews(){
  const {spotId} = useParams();
  const spotIdParsed = parseInt(spotId)
  const spot = useSelector(state => (state.spots[spotIdParsed]))

  const allReviews = useSelector(state => state.reviews)
  console.log('allReviews-----', allReviews)//objec empty
  const getAllReviewArr = Object.values(allReviews)


  // const [showUpdate, setShowUpdate] = useState(false);
  // const [hasUdpated, setHasUpdate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false)

  const sessionUser = useSelector(state => state.session.user)


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
          <div>
            {review.review}
          </div>
        )
      })}
    </ul>
    </div>
  )

)

}
