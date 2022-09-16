import {useHistory} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {thunkGetUserSpots} from "../../store/spots"
import {useEffect, useState} from "react"
import {Redirect} from 'react-router-dom'
import starIcon from '../Spots_Card/images/starIcon.png'
import {NavLink} from 'react-router-dom'


export default function GetUserSpots () {
  console.log('get user spots rendering')
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false)
  const allSpots = useSelector(state => state.spots)
  console.log('allSpots in GetUSerSpots-----', allSpots)
  const getAllSpotsArr = Object.values(allSpots)
  console.log('getAllSpotsArr located in GetUserSpots ===>', getAllSpotsArr)

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkGetUserSpots()).then(setIsLoaded(true))
  }, [dispatch])

  if(!user){
    return <Redirect to='/'/>
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
