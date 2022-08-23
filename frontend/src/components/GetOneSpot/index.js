import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { thunkGetOneSpot } from "../../store/spots"
import './getOneSpot.css'


//Get One Spot
export default function GetOneSpot () {
  const {spotId} = useParams();
  console.log('spotId:', spotId);
  const [isLoaded, setIsLoaded] = useState(false)
  const oneSpot = useSelector(state => state.spots[spotId])
    // .spotDetails?.[spotId])
  console.log('oneSpot:', oneSpot)
  // const getSpotArr = Object.values(oneSpot)



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetOneSpot(spotId)).then((res) => setIsLoaded(true))
    }, [dispatch])



return(
  isLoaded && (
    <>
    <div>Current Spot</div>
    <div>
      <ul className='current-spot-location'>{oneSpot.address}</ul>
    </div>
    </>
  )
)

}
