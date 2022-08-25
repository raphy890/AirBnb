// //src/components/DeleteSpots/DeleteSpots.js
// import './Delete.css'
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { thunkDeleteSpot } from "../../store/spots"; //import thunk


// export default function SpotDelete({spotId, setShowDelete}){
//   const dispatch = useDispatch()
//   const history = useHistory()
//   const handleDelete = async (e) => {
//     await dispatch(thunkDeleteSpot(spotId))  //thunk to be located heree

//     setShowDelete(false)
//     history.push("/")
//   }
//   return (
//     <>
//       <div className="delete-container">
//       <button className="delete-button" onClick={() => handleDelete()}>YES</button>
//       <button className="delete-button" onClick={() => setShowDelete(false)}>NO</button>
//       </div>
//     </>
//   )
// }

