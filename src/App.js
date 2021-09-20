import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeNavigator from "./navigation/HomeNavigator";
import { Helmet } from "react-helmet";

function App() {
  return (
    <Router>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
      <Route exact path="/">
        <HomeNavigator />
      </Route>
    </Router>
  );
}

export default App;
