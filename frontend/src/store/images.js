//imports
import { csrfFetch } from "./csrf";
import { actionUpdateImage } from "./spots";


const CREATE_IMAGE = '/image/addImage'         // CREATE one spot
const UPDATE_IMAGE = '/image/updateImage'         // CREATE one spot

const actionCreate = (image) => { // CREATE
  return {
    type: CREATE_IMAGE,
    image
  }
};

// const actionUpdate = (image,spotId) => { // Update
//   return {
//     type: UPDATE_IMAGE,
//     image,
//     spotId
//   }
// };



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


// *************** CREATE/POST - complete
export const thunkUpdateImage = (spotId,imageId,url) => async (dispatch) => {
  const deleteRes = await csrfFetch(`/api/images/${imageId}`, {
    method: 'DELETE',
    headers:{
      "Content-Type": "application/json"
    }
  })

  let response;
  if (deleteRes.ok){
    response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({url,previewImage:true})
  })
  
  if (response.ok){
    const newImage = await response.json()
    console.log('newImage----', newImage)
    dispatch(actionUpdateImage(newImage, spotId)) //from spots store
  }
}
}
