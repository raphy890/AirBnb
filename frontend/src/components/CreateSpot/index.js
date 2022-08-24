import {useHistory} from 'react-router-dom';
import {useState, useEffect, Redirect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {thunkCreateSpot} from '../../store/spots';




export default function CreateSpotForm() {
  const user = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat , setLat] = useState('')
  const [lng, setLng] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])


  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
      const errors = [];

      if (name.length < 1 || name.length > 49) errors.push("Name must be between 1 and 49 characters")
      if (price <= 0) errors.push("Please set a higher price");
      if (!address.length) errors.push("Please provide an address");
      if (!city.length) errors.push("Please provide a city");
      if (!state.length) errors.push("Please provide a state")
      if (!country.length) errors.push("Please provide a country")
      if (!lat) errors.push("Please provide a lat")
      if (!lng) errors.push("Please provide a lng")
      if (!description) errors.push("Please provide a description")


      return setErrors(errors);

  }, [name,price,address,city,state,country,lat,lng,description])

  if (user === null) {
      alert("You must be logged in to make a spot")
      return <Redirect to="/" />
    }

  async function onSubmit(e){
    e.preventDefault();

    setHasSubmitted(true);
    if(errors.length) return alert('can not submit')


    const details = { name, price, address, city, state, country, lng, lat, description}

    await dispatch(thunkCreateSpot(details))
}



return(
  <form
    onSubmit={onSubmit}>
      {hasSubmitted && errors.length > 0 && (
      <div>
        The following errors were found:
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )}
   <div>
   <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
   </div>
      <div>
      <label htmlFor="price">Price:</label>
      <input
          id="price"
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          />
      </div>
      <div>
      <label htmlFor="address">Address:</label>
      <input
          id="address"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          />
      </div>
      <div>
      <label htmlFor="city">City:</label>
      <input
          id="city"
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          />
      </div>
      <div>
      <label htmlFor="state">State:</label>
      <input
          id="state"
          type="text"
          onChange={(e) => setState(e.target.value)}
          value={state}
          />
      </div>
      <div>
      <label htmlFor="country">Country:</label>
      <input
          id="country"
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          />
      </div>
      <div>
         <label htmlFor="lat">Lat:</label>
        <input
          id="lat"
          type="text"
          onChange={(e) => setLat(e.target.value)}
          value={lat}
        />
      </div>
      <div>
         <label htmlFor="lng">Lng:</label>
        <input
          id="lng"
          type="text"
          onChange={(e) => setLng(e.target.value)}
          value={lng}
        />
      </div>
      <div>
         <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
          <button>Submit</button>

  </form>
  )
}
