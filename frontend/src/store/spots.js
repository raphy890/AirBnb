//imports
import { csrfFetch } from "./csrf";


//Types

const GET_ALL_SPOTS = '/spots/getAllSpots'   // GET all spots
const GET_SPOT_INFO = '/spots/spotInfo'
const EDIT_SPOT = '/spots/editSpot'          // UPDATE one spot
const CREATE_SPOT = '/spots/addSpot'         // CREATE one spot
const DELETE_SPOT = '/spots/deleteSpot'      // DELETE   one spots



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

const actionUpdateSpot = (spot) => { //UPDATE one spot
  return {
    type: EDIT_SPOT,
    spot
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
    console.log('THIS IS THE LIST DATA AFTER RES.JSON-ING THE RESPONSE', spots);

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
    // console.log('after spot---:',spot)
    dispatch(actionGetOneSpot(spot))
    // console.log('after dispatch spot---:',spot)
    return spot
  }
  return response
};



// *************** Update - complete
export const thunkUpdateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot)
  })
  if(response.ok) {
    const data = await response.json();
    dispatch(actionUpdateSpot(data));
    return data
  }
  const errors = await response.json()
  return errors
}




// *************** CREATE/POST - complete
export const thunkCreateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(spot)
})
if(response.ok){
  const newSpot = await response.json()
  dispatch(actionCreateSpot(newSpot))
  return newSpot
  }
  const err = await response.json()
  return err
};






// *************** Delete - completed
// export const thunkDeleteSpot = (spotId) => async dispatch => {
//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'DELETE',
//     body: JSON.stringify(spotId)
//   })
//   if (response.ok) {
//     const deleteSpot = await response.json()
//     dispatch(actionDeleteSpot(deleteSpot))
//     return 'deleted'
//   }
//   return response
// }







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
      return newState
    }

      case EDIT_SPOT:{ //complete
      newState = { ...state };
      newState[action.spot.id] = action.spot
      return newState;
    }

    default:
      return state;
  }
}

export default spotsReducer






    // case CREATE_SPOT: { //complete
    //   newState = { ...state };
    //   newState[action.spot.id] = action.spot
    //   return newState;
    // }

    // case DELETE_SPOT: {  //complete
    //   newState = { ...state }
    //   delete newState[action.id]
    //   return newState
    // }
