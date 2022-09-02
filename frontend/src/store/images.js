//imports
import { csrfFetch } from "./csrf";


const CREATE_IMAGE = '/image/addImage'         // CREATE one spot

const actionCreate = (image) => { // CREATE
  return {
    type: CREATE_IMAGE,
    image
  }
};



// *************** CREATE/POST - complete
export const thunkCreateImage = (spotId,url) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({url,previewImage:true})
})
if(response.ok){
  const newImage = await response.json()
  dispatch(actionCreate(newImage))
  return newImage
  }
  const err = await response.json()
  return err
};
