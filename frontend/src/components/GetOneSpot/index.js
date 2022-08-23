import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { thunkGetOneSpot } from "../../store/spots"


//Get One Spot
export default function GetOneSpot () {
  const {spotId} = useParams();
  console.log('spotId:', spotId);
  const [isLoaded, setIsLoaded] = useState(false)
  const oneSpot = useSelector(state => state.spots.spotDetails[spotId])
    // .spotDetails?.[spotId])
  console.log('oneSpot:', oneSpot)  //undefined
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
      <ul>{oneSpot.address}</ul>
    </div>
    </>
  )
)

}
