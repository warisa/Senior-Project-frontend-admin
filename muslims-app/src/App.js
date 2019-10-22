import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Index from "./page/index"
import Login from "./page/login"
import Restaurant from "./page/restaurant"
import RestaurantDetail from "./page/restaurantDetail";
import Profile from "./page/profile"
import PrayPlace from "./page/prayPlace";
import PrayPlaceDetail from "./page/prayPlaceDetail";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/restaurant">
            <Restaurant />
          </Route>
          <Route path="/prayplace">
            <PrayPlace />
          </Route>
          <Route path="/restaurantDetail/:id">
            <RestaurantDetail />
          </Route>
          <Route path="/prayplaceDetail/:id">
            <PrayPlaceDetail />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
    </Router>
  );
}