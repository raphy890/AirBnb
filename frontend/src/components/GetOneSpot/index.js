import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { thunkGetOneSpot } from "../../store/spots"
import EditSpotComponent from "../SpotEdit"
import ReviewGetComponent from "../ReviewGet"
import { Modal } from '../../context/Modal'
import './getOneSpot.css'
// import SpotDelete from "../DeleteSpot/DelteSpot.js"
import {GetSpotReviews} from '../ReviewGet/index'


//Get One Spot
export default function GetOneSpot () {
  const {spotId} = useParams();
  //console.log('spotId:', spotId);
  const [showUpdate, setShowUpdate] = useState(false);
  const [hasUdpated, setHasUpdate] = useState(false);
  const [hasReviews, setReviews] = useState(false) //////

  const [isLoaded, setIsLoaded] = useState(false)
  const oneSpot = useSelector(state => state.spots[spotId])
  const sessionUser = useSelector(state => state.session.user)
    // .spotDetails?.[spotId])
  // console.log('oneSpot:', oneSpot)
  // const getSpotArr = Object.values(oneSpot)




  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetOneSpot(spotId)).then(() => setIsLoaded(true))
    }, [dispatch])





  return(
    isLoaded && (
      <>
        <div>Current Spot</div>
        <div>
          <ul className='current-spot-location'>{oneSpot.address}</ul>
      </div>
      <ReviewGetComponent spotId={spotId} setReviews={setReviews} />
      <EditSpotComponent spotId={spotId} setShowUpdate={setShowUpdate} />
      </>
    )
  )
}
