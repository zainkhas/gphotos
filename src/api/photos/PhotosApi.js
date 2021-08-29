import { URL_API } from "../../config";
import { post } from "../HttpClient";

const getAllPhotos = async () => {
  let url = URL_API + "/photos";
  return post(url);
};

const getPhotosUploadUrl = () => {
  let url = URL_API + "/photos/upload";
  return url;
};

const photosApi = {
  getAllPhotos,
  getPhotosUploadUrl,
};
export default photosApi;
