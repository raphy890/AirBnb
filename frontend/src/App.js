// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetSpots from "./components/Spots_Card";
import GetOneSpot from "./components/GetOneSpot"
import CreateSpotForm from "./components/CreateSpot";
import CreateReviewForm from "./components/ReviewCreate"
import GetUserSpots from "./components/GetUserSpots";
import { thunkGetSpot } from "./store/spots";
// import EditSpotComponent from "./components/SpotEdit";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkGetSpot()).then(()=>dispatch(sessionActions.restoreUser())).then(() => setIsLoaded(true));
  }, [dispatch]);






  return (
    // <>
    //   <Navigation isLoaded={isLoaded} />

    // </>
    <div className="grid">
    <header>
         <Navigation isLoaded={isLoaded} />
    </header>
    <main>
    {isLoaded && (
        <Switch>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/mySpots">
            <GetUserSpots/>
          </Route>
           <Route exact path="/spots/:spotId/create">
            <CreateReviewForm />
          </Route>
          <Route exact path="/">
            <GetSpots/>
          </Route>
          <Route exact path="/spots/create">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <GetOneSpot/>
          </Route>
        </Switch>
      )}
    </main>
</div>
  );
}

export default App;
