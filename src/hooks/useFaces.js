import { useDispatch } from "react-redux";
import { addFaces as addFacesInStore } from "../store/facesReducer";
const useFaces = () => {
  const dispatch = useDispatch();
  const addFaces = (faces) => {
    dispatch(addFacesInStore(faces));
  };

  return { addFaces };
};

export default useFaces;
