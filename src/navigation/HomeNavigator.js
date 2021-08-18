import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../screens/home/Home";
import Upload from "../screens/upload/Upload";

const HomeNavigator = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Upload">
        <Upload />
      </Route>
    </Router>
  );
};

export default HomeNavigator;
