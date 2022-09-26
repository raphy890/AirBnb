import { useParams, Redirect, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetOneSpot } from "../../store/spots"
import EditSpotComponent from "../SpotEdit"
import SpotDelete from '../DeleteSpot/DeleteSpot'
import ReviewGetComponent from "../ReviewGet"
import { Modal } from '../../context/Modal'
import './getOneSpot.css'
import { thunkGetCurrentReviews } from "../../store/reviews"
import starIcon from '../Spots_Card/images/starIcon.png'



//Get One Spot
export default function GetOneSpot() {
  // console.log('GETONESPOT COMPONENT CODE RUNNING')
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
  const [, setRender] = useState(false)

  // console.log('sessionUser----', sessionUser)  //{email: , id: , username: }
  // console.log('spotId here------',spotId)

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



  useEffect(() => {
    console.log('USE EFFCT RAN IN GETONESPOT TO DISABLE/ENABLE REVIEW')
    setDisableReview(!!sessionUserReview)
  })

  const addReview = (e, spotId) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/create`)
  }

  useEffect(() => {
    console.log('USE EFFECT RAN TO GET ALL REVIEWS AND SET THEM TO A USERID')
    setUserIds(getAllReviewArr.map(rv => rv.userId))
  }, [allReviews])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetCurrentReviews(spotId))
    console.log('USE EFFECT RAN TO GET CURRENT USER')
    if(oneSpot.Owner){
      console.log('useEffect if statement on Owner was hit')
      setIsLoaded(true)
      return
    }
    dispatch(thunkGetOneSpot(spotId))
      .then((res) => console.log('res---------', res))
      .then(() => setIsLoaded(true))
  }, [dispatch])


  const rating = oneSpot?.avgStarRating === 0 ? "New" : oneSpot?.avgStarRating
  // const pic = Object.values(oneSpot) //.Images[0].url // why is Images reading undefined??
  // console.log('pic----',pic[15][0].url) // {{[Images] }}
  // const img = oneSpot
  // console.log('img----',img)

  // console.log('oneSpot------', oneSpot)
  // console.log('isloaded----', isLoaded)

  if (!oneSpot) {
    return <Redirect to='/'/>
  }

  // console.log('oneSpot.Owner------',oneSpot.Owner)

  return (
    isLoaded && (
      <>
        <div className='main'>
          <div className='main-wrapper'>
            <div className='spot-name'>
              <h2>{oneSpot.name}</h2>
            </div>
            <div className="spot-details">
              <div className='review Size'>
                <img className='star-icon' src={starIcon} alt='true' />
                {Number(rating).toFixed(2)}
              </div>
              <div className="spot-location"> {oneSpot.city}, {oneSpot.state}, {oneSpot.country}</div>
            </div>
            <br />
            <div>
              <img className="class-Img" src={oneSpot?.Images[0].url} />
            </div>
            <div className="container-price-rating">
              <div style={{ fontSize: '20px' }}>
                  <img className='star-icon' src={starIcon} alt='true' />
                  {Number(rating).toFixed(2)}
                </div>
                <div className='spot-price' style={{ fontSize: '20px' }}>${oneSpot.price}</div>
            </div>
            <div className="container-for-middle-part">
              <div className='info-left'>
                <div style= {{fontSize: '20px', fontWeight:"bold" }}>This spot is hosted by {oneSpot.Owner.firstName}</div>
                <div> {oneSpot.description}</div>
                {oneSpot.ownerId === sessionUser?.id && (
                  <div className='host-buttons'>
                    <button className="button-logo-edit" onClick={() => setShowUpdate(true)}>Edit Spot</button>
                    <button className="button-logo" onClick={() => setShowDelete(true)}>Delete Spot</button>

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
              </div>

              <div className="info-right">

              </div>
            </div >

                <h1 className='title-review'>Reviews for {oneSpot.name}</h1>
                {!sessionUser ? null : oneSpot.ownerId !== sessionUser?.id && <button className="review-button-logo" disabled={disableReview} onClick={(e) => addReview(e, oneSpot.id)}>Review Spot</button>}
                <ReviewGetComponent className="button-logo" spotId={spotId} setReviews={setReviews} sessionUser={sessionUser} />
          </div>
        </div>
      </>
    )
  )
}
