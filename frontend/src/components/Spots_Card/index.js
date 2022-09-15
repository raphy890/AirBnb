import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import { thunkGetSpot } from "../../store/spots"
import Spots_Card from "../Spots_Card"
// import Favicon from "../Navigation/images/Favicon"
import './spotcards.css'
import starIcon from './images/starIcon.png'
// add get details of sppt


//Get All Spots Dispatch
export default function GetSpots() {

  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch();
  const allSpots = useSelector(state => state.spots)
  const getAllSpotsArr = Object.values(allSpots);

  useEffect(() => {
    dispatch(thunkGetSpot()).then(setIsLoaded(true));
  }, [dispatch])

  if (!getAllSpotsArr.length) {
    return null
  }


  return (
    isLoaded && (
      <>
        <div className="spots-container">
          <div className="spots-cards-container">
            {getAllSpotsArr.map((spot) => (
              <div key={spot.id}>
                {/* <a href={`/spots/${spot.id}`}> */}
                <NavLink to={`/spots/${spot.id}`}>
                  <img
                    className="spot-img"
                    src={spot.previewImage}
                    alt="true">
                  </img>
                {/* </a> */}
                </NavLink>
                <div className="spot-info-container">
                  <p className="spot-info-left">
                    <div style=
                      {{ fontSize: '16px', fontWeight: 'bold' }}>
                      {spot.name}
                    </div>
                    <div style=
                      {{ fontSize: '13px' }}>{spot.city}, {spot.state}
                    </div>
                    <div className='price-container'>
                      <div style=
                        {{ fontSize: '16px', fontWeight: 'bold' }}>
                        ${spot.price}
                      </div>
                      &nbsp;/night
                    </div>
                  </p>
                  <div className='spot-info-right'>
                    <div style={{ fontSize: '16px' }}>
                      <img className='star-icon' src={starIcon} alt='true' />
                      {Number(spot.avgRating).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )

  )

}
