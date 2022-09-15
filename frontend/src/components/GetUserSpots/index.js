import {useHistory} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {thunkGetUserSpots} from "../../store/spots"
import {useEffect} from "react"


function GetUserSpots () {

  const history = useHistory();

  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    if(user)
    dispatch(thunkGetUserSpots())
  })

  return(null)

}

export default GetUserSpots
