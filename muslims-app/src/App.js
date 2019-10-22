import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Index from "./page/index"
import Login from "./page/login"
import Restaurant from "./page/restaurant"
import RestaurantDetail from "./page/restaurantDetail";
import Profile from "./page/profile"
import PrayPlace from "./page/prayPlace";
import PrayPlaceDetail from "./page/prayPlaceDetail";

const AppState = {
    loggedIn: false,
    login: function(){
        this.loggedIn = true;
    },
    logout: function(){
        this.loggedIn = false;
    }
};

export default function App() {
  return (
    <Router>
        <Switch>
              <Route exact path="/">
                {
                  localStorage.getItem("userId") != null ? <Index /> : <Redirect to="/login"/>
                }
              </Route>
              <Route path="/restaurant">
                {
                  localStorage.getItem("userId") != null ? <Restaurant /> : <Redirect to="/login"/>
                }
              </Route>
              <Route path="/prayplace">
                {
                  localStorage.getItem("userId") != null ? <PrayPlace /> : <Redirect to="/login"/>
                }
              </Route>
              <Route path="/restaurantDetail/:id">
                {
                  localStorage.getItem("userId") != null ? <RestaurantDetail /> : <Redirect to="/login"/>
                }
              </Route>
              <Route path="/prayplaceDetail/:id">
                {
                  localStorage.getItem("userId") != null ? <PrayPlaceDetail /> : <Redirect to="/login"/>
                }
              </Route>
              <Route path="/profile">
                {
                  localStorage.getItem("userId") != null ? <Profile /> : <Redirect to="/login"/>
                }
              </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route render={ () => <h1>404 Error</h1> } />
        </Switch>
    </Router>
  );
}