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
  // console.log(oneSpot)
  const sessionUser = useSelector(state => state.session.user)
  const [disableReview, setDisableReview] = useState(true); //create state to disable or enable a review
  const [,setRender] = useState(false)

  // console.log('sessionUser----', sessionUser)  //{email: , id: , username: }
  console.log('spotId here------',spotId)

  const allReviews = useSelector(state => state.reviews)
  // console.log('allReviews-----', allReviews)
  /*
  if allReviews.spotId = oneSpot.id &&
  */

  const getAllReviewArr = Object.values(allReviews)
  // console.log("getAllReviewArr----", getAllReviewArr)
  const [userIds, setUserIds] = useState([])
  // console.log('userIds----', userIds) // returns all of the reviews and the associated userId BUT NOT THE SPOTID

  const sessionUserReview = !sessionUser ? null : getAllReviewArr.find((review) =>   //if user does not exist, return null else if a review contains a userId equal to sessionUserId then set value equal to sessionUserReview
    (review.userId === sessionUser.id)
  )



  useEffect(() =>{
    setDisableReview(!!sessionUserReview)
  })

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
    dispatch(thunkGetOneSpot(spotId))
    .then((res) => console.log('res---------',res))
    .then(() => setIsLoaded(true))
  }, [dispatch])


  const rating = oneSpot?.avgStarRating == 0 ? "New" : oneSpot?.avgStarRating
  // const pic = Object.values(oneSpot) //.Images[0].url // why is Images reading undefined??
  // console.log('pic----',pic[15][0].url) // {{[Images] }}
  // const img = oneSpot
  // console.log('img----',img)

  console.log('oneSpot------',oneSpot)
  console.log('isloaded----', isLoaded)

  //FORCE A RERENDER
  if (oneSpot.Images === undefined) {
    dispatch(thunkGetOneSpot(spotId)).then(()=> setRender((prev) => !prev))
    console.log('why??')
    return (<div>...Loading</div>)
  }

  return (
    isLoaded && (
      <>
        <div>
          <h2>{oneSpot.name}</h2>
        </div>
        <div>
           <img src={oneSpot?.Images[0].url}/>
           {/* {console.log(oneSpot.Images[0])} */}
           {/* {!oneSpot.Images[0].url ? null :} */}
          <p>Rating: {rating}</p>
          <p>{oneSpot.city}, {oneSpot.state}</p>
          <ul className='current-spot-location'>{oneSpot.address}</ul>
        </div>
        <div>

         {!sessionUser ? null :oneSpot.ownerId !== sessionUser?.id && <button disabled={disableReview}  onClick={(e) => addReview(e, oneSpot.id)}>Review Spot</button>}

         {/* !userIds.includes(sessionUser?.id) && */}


          {oneSpot.ownerId === sessionUser?.id && (
            <div>
              <button onClick={() => setShowUpdate(true)}>Edit Spot</button>
              <button onClick={() => setShowDelete(true)}>Delete Spot</button>

              {showUpdate && (
                <Modal onClose={() => setShowUpdate(false)}>
                  <EditSpotComponent image={oneSpot.Images[0]} spotId={spotId} setShowUpdate={setShowUpdate} />
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
