import { useParams, useHistory, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from 'react'
import { thunkUpdateSpot,thunkGetOneSpot } from "../../store/spots"
import './SpotEdit.css'
const LAT = 39.76;
const LNG = -100.99;

export default function EditSpotComponent(setShowUpdate) {
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  const {spotId} = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat , setLat] = useState('')
  const [lng, setLng] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')



  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const errors = [];

    if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters")
    if (!address.length) errors.push("Please provide an address");
    if (!city.length) errors.push("Please provide a city");
    if (!state.length) errors.push("Please provide a state")
    if (!country.length) errors.push("Please provide a country")
    if (price <= 0) errors.push("Please set a higher price");
    if (!lat) errors.push("Please provide a lat")
    if (!lng) errors.push("Please provide a lng")
    if (!description) errors.push("Please provide a description")
    if (!url) errors.push("Please provide a url")


    return setErrors(errors);
  }, [name,address,city,state,country,price,lat,lng,description,url] )

  if(user === null){
    alert("Must be logged in to perform that action")
    return <Redirect to='/'/>
  }

  async function onSubmit(e){
    e.preventDefault();

    setHasSubmitted(true);
    if(errors.length) return alert('can not submit')

    const details = { id:spotId,name,address,city,state,country,price,lat,lng,description,url}

    const response = await dispatch(thunkUpdateSpot(details))
    await dispatch(thunkGetOneSpot(spotId))
    setShowUpdate(false)
    history.push(`/spots/${spotId}`)
  }

  return (
    <form
      onSubmit={onSubmit}
    >
      <div>
        <h3>Update Spot Form</h3>
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
          onChange={(e) => setName(e.target.value)}
        />
         <label htmlFor="name">Price:</label>
        <input
          id='price'
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="address">Adress:</label>
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="city">City:</label>
        <input
          id='city'
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="state">State:</label>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="number"
          className="form-input none update"
          value={lat}
          min='-90'
          max='90'
          step="0.01"
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="number"
          className="form-input none update"
          value={lng}
          min='-180'
          max='180'
          step="0.01"
          placeholder="Longitude"
          onChange={(e) => setLng(e.target.value)}
          required
        />
        <input
          type="string"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          type="text"
          value={description}
          className="form-input last desc update"
          placeholder="Description"
          maxLength='50'
          minLength='5'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Spot</button>
    </form>
  )
}
