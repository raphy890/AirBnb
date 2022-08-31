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
      <div>ALL SPOTS</div>
      <div>
        <div>
          {getAllSpotsArr.map((spot) => (
            <div key={spot.id}>
              <div>
                {spot.name}
              </div>
              <p>
                <a href={`/spots/${spot.id}`}>
                  <img src={spot.previewImage}></img>
                </a>
              </p>
              <div>
                {spot.city}, {spot.state}
              </div>
              <div>
                {Number(spot.avgRating).toFixed(2)}
              </div>
              <div>
                {`$${spot.price} night`}
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
    )

  )


}
