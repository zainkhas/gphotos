import "./App.css";
import { useEffect, useState } from "react";
import { log } from "./common/Common";
import useApi from "./hooks/useApi";

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

  useEffect(() => {
    getData();
  }, []);

  return <div>Hey</div>;
}

export default App;
