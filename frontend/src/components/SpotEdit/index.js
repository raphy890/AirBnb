import { useParams, useHistory, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { thunkUpdateSpot,thunkGetOneSpot } from "../../store/spots"
import {thunkCreateImage, thunkUpdateImage} from "../../store/images"
import './SpotEdit.css'
// const lat = 39.76;
// const lng = -100.99;

export default function EditSpotComponent({image,setShowUpdate,}){
  const lat = 39.76;
  const lng = -100.99;
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  const {spotId} = useParams();
  const formInformation = useSelector(state => state.spots[spotId])
  // console.log('formInformation---', formInformation)
  const [name, setName] = useState(formInformation.name);
  const [price, setPrice] = useState(formInformation.price);
  const [address, setAddress] = useState(formInformation.address);
  const [city, setCity] = useState(formInformation.city);
  const [state, setState] = useState(formInformation.state);
  const [country, setCountry] = useState(formInformation.country);
  // const [lat , setLat] = useState('')
  // const [lng, setLng] = useState('')
  const [description, setDescription] = useState(formInformation.description)
  const [url, setUrl] = useState('')

  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [, setRender] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    const errors = [];

    if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters")
    if (!address.length) errors.push("Please provide an address");
    if (!city.length) errors.push("Please provide a city");
    if (!state.length) errors.push("Please provide a state")
    if (!country.length) errors.push("Please provide a country")
    if (price <= 0) errors.push("Please set a higher price");
    // if (!lat) errors.push("Please provide a lat")
    // if (!lng) errors.push("Please provide a lng")
    if (!description) errors.push("Please provide a description")
    if (!url) errors.push("Please provide a url")


    return setErrors(errors);
  }, [name,address,city,state,country,price,description,lat,lng,url] )

  if(user === null){
    alert("Must be logged in to perform that action")
    return <Redirect to='/'/>
  }

  async function onSubmit(e){
    e.preventDefault();
    setHasSubmitted(true);
    if(errors.length) return alert('can not submit')

    const details = { id:spotId,name,address,city,state,country,price,lat,lng,description}

    dispatch(thunkGetOneSpot(spotId))
    dispatch(thunkUpdateSpot(details))
    // dispatch(thunkCreateImage(spotId,url))
    dispatch(thunkUpdateImage(spotId,image.id,url))
    // .then(() => setRender((prev) => !prev))
    .then(() => setShowUpdate(false))
  }

  return (
    <form
      className="login-form-SignUp"
      onSubmit={onSubmit}
    >
      <div>
        <h1 className="signup-h3">Update Spot Form</h1>
      </div>
      {hasSubmitted && errors.length > 0 && (
        <ul>
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id='name'
          type="text"
          placeholder="Name"
          value={name}
          className="login-input"
          onChange={(e) => setName(e.target.value)}
        />
         <label htmlFor="name">Price:</label>
        <input
          id='price'
          type="number"
          placeholder="Price"
          value={price}
          className="login-input"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="address">Adress:</label>
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={address}
          className="login-input"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="city">City:</label>
        <input
          id='city'
          type="text"
          placeholder="City"
          value={city}
          className="login-input"
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="state">State:</label>
        <input
          type="text"
          placeholder="State"
          value={state}
          className="login-input"
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          className="login-input"
          onChange={(e) => setCountry(e.target.value)}
        />
        {/* <input
          type="number"
          className="login-input"
          value={lat}
          min='-90'
          max='90'
          step="0.01"
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
        /> */}
        {/* <input
          type="number"
          className="login-input"
          value={lng}
          min='-180'
          max='180'
          step="0.01"
          placeholder="Longitude"
          onChange={(e) => setLng(e.target.value)}
          required
        /> */}
        <input
          type="string"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="login-input"
        />
        <textarea
          type="text"
          value={description}
          className="login-input"
          placeholder="Description"
          maxLength='50'
          minLength='5'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button
        className="login-button "
        type="submit">Update Spot</button>
    </form>
  )
}
