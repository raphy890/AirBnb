//imports
import { csrfFetch } from "./csrf";
import {thunkCreateImage} from "./images"


//Types

const GET_ALL_SPOTS = '/spots/getAllSpots'   // GET all spots
const GET_SPOT_INFO = '/spots/spotInfo'

const GET_SPOTS_USER = '/spots/getUserSpots'

const EDIT_SPOT = '/spots/editSpot'          // UPDATE one spot
const CREATE_SPOT = '/spots/addSpot'         // CREATE one spot
const DELETE_SPOT = '/spots/deleteSpot'      // DELETE   one spots
const UPDATE_IMAGE = '/image/updateImage'         // CREATE one spot


//Actions
const actionGetAllSpots = (spots) => { // GET all spots
  return {
    type: GET_ALL_SPOTS,
    spots
  }
};

const actionGetOneSpot = (spot) => {  //Get one spot
  return {
    type: GET_SPOT_INFO,
    spot
  }
}

const actionGetUserSpots = (spots) => {
  return {
    type: GET_SPOTS_USER,
    spots
  }
}

const actionUpdateSpot = (spot) => { //UPDATE one spot
  return {
    type: EDIT_SPOT,
    spot
  }
};

export const actionUpdateImage = (image,spotId) => { // Update
  return {
    type: UPDATE_IMAGE,
    image,
    spotId
  }
};

const actionCreateSpot = (spot) => { // CREATE one spot
  return {
    type: CREATE_SPOT,
    spot
  }
};

const actionDeleteSpot = (id) => { // DELETE   one spots
  return {
    type: DELETE_SPOT,
    id
  }
};



// ******************* Thunk Section *****************

// *************** GET ALL/READ - complete
export const thunkGetSpot = () => async (dispatch) => {
  //console.log('THUNK CODE STARTS RUNNING, RIGHT BEFORE FETCH'
  const response = await csrfFetch('/api/spots')
  //console.log('THIS IS THE RESPONSE RETURNED FROM FETCH;', response)

  if (response.ok) {
    const spots = await response.json();
    // console.log('THIS IS THE LIST DATA AFTER RES.JSON-ING THE RESPONSE', spots);

    //console.log('BEFORE THE THUNK DISPATCHES THE ACTION')
    dispatch(actionGetAllSpots(spots.allSpots));
    //console.log('AFTER THE THUNK DISPATCHES THE ACTION')
    return response
  }
  return response
  // await response.json();
};




// *************** GET ONE/READ -
export const thunkGetOneSpot = (id) => async (dispatch) => {
  // console.log('id-----:',id)
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const spot = await response.json();
    console.log('after spot---:',spot)
    dispatch(actionGetOneSpot(spot))
    console.log('after dispatch spot---:',spot)
    return spot
  }
  return response
    // await response.json();
};






// *************** GET USER SPOTS/READ -
export const thunkGetUserSpots = () => async (dispatch) => {
    // console.log('THUNK CODE STARTS RUNNING, RIGHT BEFORE FETCH')
  const response = await csrfFetch(`/api/spots/current`)

    // console.log('THIS IS THE RESPONSE RETURNED FROM FETCH;', response)


  if(response.ok){
    const spots = await response.json()
    console.log('THIS IS THE LIST DATA AFTER RES.JSON-ING THE RESPONSE LOCATED IN THUNKGETUSERSPOTS', spots);

    console.log('BEFORE THE THUNK DISPATCHES THE ACTION')
    dispatch(actionGetUserSpots(spots))
    console.log('AFTER THE THUNK DISPATCHES THE ACTION')

    return spots
  }
  return response
}








// *************** Update - complete
export const thunkUpdateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot)
  })
  if(response.ok) {
    const data = await response.json();
    console.log('data----',data)
    dispatch(actionUpdateSpot(data));

    return data
  }

  return await response.json();
}




// *************** CREATE/POST - complete
export const thunkCreateSpot = (spot) => async (dispatch) => {

  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(spot)
}).catch(async (e) => {
  const errorMessage = await e.json() //catch error if 500 is thrown  ==> use in the future => .catch(async (e) => {const errorMessage = await e.json() console.log('error message---- spot store', errorMessage)
  console.log('error message---- spot store', errorMessage)
  throw errorMessage
})
if(response.ok){
  const newSpot = await response.json()
  // console.log(newSpot)//returns new spot information
  // console.log(spot)// returns input of spot
  dispatch(actionCreateSpot(newSpot))
  dispatch(thunkCreateImage(newSpot.id,spot.url))  //grab the id of the new spot along with the added url
  return newSpot
  }
  const err = await response.json()
  return err
};






// *************** Delete - completed
export const thunkDeleteSpot = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    // body: spotId
  })
  if (response.ok) {
    const deleteSpot = await response.json()
    dispatch(actionDeleteSpot(spotId))
    return deleteSpot
  }
  return response
}







// ********************* Reducers ********************

const spotsReducer = (state = {}, action) => {
  let newState;

  switch (action.type) {

    case GET_ALL_SPOTS:
      newState = { ...state }
      action.spots.forEach(spot => {
        newState[spot.id] = spot
      })
      return newState


    case GET_SPOT_INFO: {
      let newState = {...state}
      newState[action.spot.id] = action.spot
      // console.log('action.spot-----',action.spot)
      return newState
    }

    case GET_SPOTS_USER:{
      let newState = {}
      const newSpots = action.spots.allSpots //[{},{}]
      console.log('newSpots in this biiii----' ,action.spots.allSpots) //returns all spots owned by user

      newSpots.forEach(spot => {
        newState[spot.id] = spot
        console.log('newState----', newState)
      })
      return newState
    }


    case CREATE_SPOT: { //complete
      newState = { ...state };
      newState[action.spot.id] = action.spot
      return newState;
    }

      case EDIT_SPOT:{ //complete
      newState = { ...state };
      newState[action.spot.id] = {...newState[action.spot.id],...action.spot}
      console.log("newState------",newState)
      // newState[action.spot.id].Owner = state[action.spot.id].Owner
      // newState[action.spot.id].Images = state[action.spot.id].Images
      return newState;
    }

      case UPDATE_IMAGE:{
      newState = {...state};
      // const Images = [action.image]
      newState[action.spotId].Images = [action.image]
      return newState
      }

      case DELETE_SPOT: {  //complete
      newState = { ...state }
      delete newState[action.id]
      return newState
    }

    default:
      return state;
  }
}

export default spotsReducer
