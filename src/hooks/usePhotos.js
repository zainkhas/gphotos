import useSnackBar from "./useSnackBar";
import useApi from "./useApi";
import { log } from "../common/Common";
import { updatePhotos, trash } from "../store/photosReducer";
import { useDispatch } from "react-redux";
import { URL_DATA } from "../config";

const usePhotos = () => {
  const { SnackBar } = useSnackBar();
  const { getAllPhotos, trashPhoto: trashPhotoOnServer } = useApi();
  const dispatch = useDispatch();

  const trashPhoto = async (id, index) => {
    try {
      let res = await trashPhotoOnServer(id);
      log("trash res: ", res);
      dispatch(trash(index));
      SnackBar.success("Moved to Trash");
    } catch (error) {
      log("Error trashing: ", error);
      SnackBar.error("Error trashing Photo! Try again");
    }
  };

  const transformData = (data) => {
    let finalArr = data?.map((img) => ({
      src: URL_DATA + "/public/uploads/" + img.name,
      thumbnail: URL_DATA + "/public/thumb/thumb_" + img.name,
      thumbnailWidth: 250,
      thumbnailHeight: 250,
      metaData: img?.metaData != "" ? JSON.parse(img.metaData) : null,
      ...img,
    }));

    log("Transformed: ", finalArr);
    return finalArr;
  };

  const getPhotos = async () => {
    try {
      let res = await getAllPhotos();
      dispatch(updatePhotos(transformData(res)));
    } catch (error) {
      log("Error getPhotos: ", error);
    }
  };

  return { getPhotos, trashPhoto };
};

export default usePhotos;
