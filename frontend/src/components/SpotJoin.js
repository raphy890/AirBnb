// import {useEffect} from 'react';
// import {useParams, useHistory} from 'react-router-dom';
// import {useDispatch, useSelector} from 'react-redux';

// import EditSpotComponent from './SpotEdit';
// import './SpotJoin.css';


// export default function SpotJoin(){
//   let {spotId} = useParams();
//   const spot = useSelector(state => state.spotReducer[spotId]);

//   const sessionUser = useSelector(state => state.session.user);
//   const history = useHistory();
//   if(!sessionUser) history.push('/');

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(thunkGetSpot())
// }, [dispatch])

//   if(sessionUser === undefined) history.push('/');
//   if(!spot) return null;

//   eturn (

//     <>
//     {spot && (
//         <>
//             <div id="header">
//                 <div id="spot-name">
//                     <h2 id='spot-name'>{spot?.name}</h2>
//                     <p>{spot?.address}</p>
//                 </div>
//                 <DeleteComponent spot={spot} />
//             </div>
//             <div className="img-container">
//                 {spot.Images && spot.Images.map((image, index) => (
//                     <div key={image?.id} id={`img-${index}`}>
//                         <img src={image?.url} alt="" ></img>
//                     </div>

//                 ))}
//                 {(spot.Images === undefined || spot.Images.length === 0) && (
//                     <>
//                         <div id={`img-0`}>
//                             <img src='https://static.wikia.nocookie.net/d9b266f4-c611-4760-a880-e4a7f9fe0883/scale-to-width/755' alt="Creel House" ></img>
//                         </div>
//                         <div id={`img-1`}>
//                             <img src='https://static.wikia.nocookie.net/d9b266f4-c611-4760-a880-e4a7f9fe0883/scale-to-width/755' alt="Creel House" ></img>
//                         </div>
//                         <div id={`img-2`}>
//                             <img src='https://static.wikia.nocookie.net/d9b266f4-c611-4760-a880-e4a7f9fe0883/scale-to-width/755' alt="Creel House" ></img>
//                         </div>
//                         <div id={`img-3`}>
//                             <img src='https://static.wikia.nocookie.net/d9b266f4-c611-4760-a880-e4a7f9fe0883/scale-to-width/755' alt="Creel House" ></img>
//                         </div>
//                         <div id={`img-4`}>
//                             <img src='https://static.wikia.nocookie.net/d9b266f4-c611-4760-a880-e4a7f9fe0883/scale-to-width/755' alt="Creel House" ></img>
//                         </div>
//                     </>

//                 )}
//             </div>
//             <div className="details-container">
//                 <div className="details">
//                     <h3>Hosted by {spot?.User?.username}</h3>
//                     <p>{spot?.history}</p>
//                 </div>

//                 {/* <div className="booking">
//                     <BookingComponent spotId={spot?.id} price={spot?.price} />
//                 </div> */}
//             </div>
//                 <>
//                     <EditSpotComponent spot={spot}/>
//                 </>
//         </>
//     )}
//     </>
// )
// }
