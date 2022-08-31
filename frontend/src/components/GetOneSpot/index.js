import { useParams, Redirect, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetOneSpot } from "../../store/spots"
import EditSpotComponent from "../SpotEdit"
import SpotDelete from '../DeleteSpot/DeleteSpot'
import ReviewGetComponent from "../ReviewGet"
import { Modal } from '../../context/Modal'
import './getOneSpot.css'
import {thunkGetCurrentReviews} from "../../store/reviews"
// import SpotDelete from "../DeleteSpot/DelteSpot.js"
// import { GetSpotReviews } from '../ReviewGet/index'


//Get One Spot
export default function GetOneSpot() {
  const { spotId } = useParams();
  //console.log('spotId:', spotId);
  const [showUpdate, setShowUpdate] = useState(false);
  // const [hasUdpated, setHasUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [hasReviews, setReviews] = useState(false)
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false)
  const oneSpot = useSelector(state => state.spots[spotId])
  const sessionUser = useSelector(state => state.session.user)


  const allReviews = useSelector(state => state.reviews)

  const getAllReviewArr = Object.values(allReviews)
  const [userIds, setUserIds] = useState([])




  const addReview = (e, spotId) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/create`)
  }

  useEffect(() => {
    setUserIds(getAllReviewArr.map(rv=>rv.userId))
  }, [allReviews])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetCurrentReviews(spotId))
    dispatch(thunkGetOneSpot(spotId)).then(() => setIsLoaded(true))
  }, [dispatch])

  const rating = oneSpot?.avgStarRating == 0 ? "New" : oneSpot?.avgStarRating
  // const pic = oneSpot.Images[0].url // why is Images reading undefined??


  return (
    isLoaded && (
      <>
        <div>
          <h2>{oneSpot.name}</h2>
        </div>
        <div>
          <img src={oneSpot.Images[0].url}/>
          <p>Rating: {rating}</p>
          <p>{oneSpot.city}, {oneSpot.state}</p>
          <ul className='current-spot-location'>{oneSpot.address}</ul>
        </div>
        <div>

         {oneSpot.ownerId !== sessionUser?.id && !userIds.includes(sessionUser?.id) && <button onClick={(e) => addReview(e, oneSpot.id)}>Review Spot</button>}

          {oneSpot.ownerId === sessionUser?.id && (
            <div>
              <button onClick={() => setShowUpdate(true)}>Edit Spot</button>
              <button onClick={() => setShowDelete(true)}>Delete Spot</button>

              {showUpdate && (
                <Modal onClose={() => setShowUpdate(false)}>
                  <EditSpotComponent spotId={spotId} setShowUpdate={setShowUpdate} />
                </Modal>
              )}
              {showDelete && (
                <Modal onClose={() => setShowDelete(false)} >
                  <SpotDelete spotId={spotId} setShowDelete={setShowDelete} />
                </Modal>
              )}
            </div>
          )}
          <ReviewGetComponent spotId={spotId} setReviews={setReviews} sessionUser={sessionUser}/>
        </div>
        <div>
          {oneSpot && (
            <div>
              {/* <img src={`${oneSpot.previewImage}`} /> */}
            </div>
          )}
        </div >
      </>
    )
  )
}
