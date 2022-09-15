//imports
import { csrfFetch } from "./csrf";


//Types
const GET_CURRENT_REVIEWS = '/reviews/reviewInfo'
const CREATE_REVIEW = '/reviews/addReview'
const DELETE_REVIEW = '/reviews/deleteReview'



//Actions
const actionGetCurrentReviews = (reviews) => {
  return {
    type: GET_CURRENT_REVIEWS,
    reviews
  }
}

const actionCreateReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
};

const actionDeleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
};

// ******************* Thunk Section *****************

// *************** GET REVIEWS
export const thunkGetCurrentReviews = (spotId) => async (dispatch) => {
  // console.log('THUNK CODE STARTS RUNNING, RIGHT BEFORE FETCH'
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
  // console.log('THIS IS THE RESPONSE RETURNED FROM FETCH;', response)

  if (response.ok) {
    const reviews = await response.json();
    // console.log('THIS IS THE LIST DATA AFTER RES.JSON-ING THE RESPONSE', reviews);
   console.log("reviews", reviews);
    // console.log('BEFORE THE THUNK DISPATCHES THE ACTION')
    dispatch(actionGetCurrentReviews(reviews));
    // console.log('AFTER THE THUNK DISPATCHES THE ACTION')
    // ret
  }
  return response
  // await response.json();
};



// *************** CREATE/POST
export const thunkCreateReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })
  if (response.ok) {
    const newReview = await response.json()
    return dispatch(actionCreateReview(newReview))
  } else throw response
};




// *************** Delete
export const thunkDeleteReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    const deleteReview = await response.json()
    dispatch(actionDeleteReview(reviewId))
    // return 'deleted'
    return deleteReview
  }
}





// ********************* Reducers ********************

const reviewReducer = (state = {}, action) => {
  let newState;

  switch (action.type) {

    case GET_CURRENT_REVIEWS:
      newState = {}
      action.reviews.forEach(review => {
        console.log('reducer----',review)
        newState[review.id] = review
      })
      return newState
      // console.log('action-------',action)
      // console.log('action.reviews--------',action.reviews)
      // console.log(state)


    case CREATE_REVIEW: { //complete
      newState = { ...state };
      newState[action.review.id] = action.review
      return newState;
    }


    case DELETE_REVIEW: {  //complete
      newState = { ...state }
      delete newState[action.id]
      return newState
    }

    default:
      return state;
  }
}

export default reviewReducer
