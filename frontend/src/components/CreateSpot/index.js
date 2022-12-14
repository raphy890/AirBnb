import { useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateSpot } from '../../store/spots';
import { thunkCreateImage } from '../../store/images';
import './CreateSpot.css'




export default function CreateSpotForm() {
  const lat = 39.76;
  const lng = -100.99;
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  // const [lat, setLat] = useState('')
  // const [lng, setLng] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])
  const [url, setUrl] = useState('')
  const validImages = ["png", "jpg", "jpeg", "svg", "heic", "gif"];

  function confirmImage(url) {
    return /\.(jpg|png|jpeg|svg|gif)$/.test(url);
  }

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const errors = [];
    const newUrl = url.split("/");
    const img = newUrl[newUrl.length - 1].split(".")[1];

    if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters")
    if (price <= 0) errors.push("Please set a higher price");
    if (!address.length) errors.push("Please provide an address");
    if (!city.length) errors.push("Please provide a city");
    if (!state.length) errors.push("Please provide a state")
    if (!country.length) errors.push("Please provide a country")
    // if (!lat) errors.push("Please provide a lat")
    // if (!lng) errors.push("Please provide a lng")
    if (!description) errors.push("Please provide a description")
    if (!url) errors.push("Please provide a url")
    if (!validImages.includes(img)) errors.push("Image must be valid")

    return setErrors(errors);

  }, [name, price, address, city, state, country, description, url])

  if (user === null) {
    alert("You must be logged in to make a spot")
    return <Redirect to="/" />
  }

  async function onSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert('can not submit')


    const details = { name, price, address, city, state, country, lng, lat, description, url }
    const spot = await thunkCreateSpot(details)
    // console.log({spot})
    await dispatch(spot)


    history.push('/')
  }

  const size = {
    width: '200px'
  };

  return (
    <div className="host-page-container">
      <div className="host-page-left-conatiner">
        <h1 className="host-message">Host Your Spot!</h1>
      </div>
      <div className="host-page-right-container">
        <form
          onSubmit={onSubmit}
          className="new-spot-form"
        >
          {hasSubmitted && errors.length > 0 && (
            <div className="errors-list">
              <div style={{"margin-right": "120px"}}>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </div>
            </div>
          )}

          <div className="create-spot-input-wrapper">
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Name of Spot'
              className="form-input-none-create"
            />
          </div>
          <div>
            <input
              id="price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder='Price'
              className="form-input-none-create"
            />
          </div>
          <div>
            <input
              id="address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder='Address'
              className="form-input-none-create"
            />
          </div>
          <div>
            <input
              id="city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder='City'
              className="form-input-none-create"
            />
          </div>
          <div>
            <input
              id="state"
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
              placeholder='State'
              className="form-input-none-create"
            />
          </div>
          <div>
            <input
              id="country"
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder='Country'
              className="form-input-none-create"
            />
          </div>
          {/* <div>
            <input
              id="lat"
              type="text"
              onChange={(e) => setLat(e.target.value)}
              value={lat}
              placeholder="Latitude"
              className="form-input-none-create"
            />
          </div>
          <div>
            <input
              id="lng"
              type="text"
              onChange={(e) => setLng(e.target.value)}
              value={lng}
              placeholder="Logitude"
              className="form-input-none-create"
            />
          </div> */}
          <div>
            <span style={size}>
              <input
                id="url"
                type="string"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                placeholder="Image URL"
                className="form-input-none-create"
              />
            </span>
          </div>
          <div>
            <label htmlFor="description"></label>
            <input
              id="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='Description'
              className="form-input-none-create"
            />
          </div>
          <button className="create-submit-button" type="submit">Create Spot</button>
        </form>
      </div>
    </div>
  )
}
