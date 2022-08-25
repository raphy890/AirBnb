import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { thunkGetSpot } from "../../store/spots"
import Spots_Card from "../Spots_Card"
import './spotcards.css'
// add get details of sppt


//Get All Spots Dispatch
export default function GetSpots () {

  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch();
  const allSpots = useSelector(state => state.spots)
  const getAllSpotsArr = Object.values(allSpots);

  useEffect(() => {
  dispatch(thunkGetSpot()).then(setIsLoaded(true));
  }, [dispatch])

  if(!getAllSpotsArr.length){
    return null
  }

  




  return(
    isLoaded && (
      <>
      <div>All Spots</div>
      <div>
        <ul>
          {getAllSpotsArr.map((spot) => (
            <li key={spot.id}>{spot.name}</li>
          ))}
        </ul>
      </div>
      </>
    )

  )


}
