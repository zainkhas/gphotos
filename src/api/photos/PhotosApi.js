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

const deleteAll = () => {
  let url = URL_API + "/deleteAll";
  return post(url);
};

const photosApi = {
  getAllPhotos,
  getPhotosUploadUrl,
  deleteAll,
};
export default photosApi;
