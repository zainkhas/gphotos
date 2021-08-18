import "./App.css";
import { useEffect, useState } from "react";
import { log } from "./common/Common";
import useApi from "./hooks/useApi";
import Home from "./screens/home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Upload from "./screens/upload/Upload";
import HomeNavigator from "./navigation/HomeNavigator";

function App() {
  const { getAllPhotos } = useApi();
  const [photos, setPhotos] = useState([]);
  const getData = async () => {
    try {
      let data = await getAllPhotos();
      setPhotos(data);
    } catch (error) {
      log("Error: ", error);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Router>
      <Route exact path="/">
        <HomeNavigator />
      </Route>
    </Router>
  );
}

export default App;
