import { URL_API } from "../../config";
import { post, upload } from "../HttpClient";

const getAllPhotos = async () => {
  let url = URL_API + "/photos";
  return post(url);
};

const deleteAll = () => {
  let url = URL_API + "/deleteAll";
  return post(url);
};

const uploadPhotos = (files, onProgress) => {
  let url = URL_API + "/photos/upload";
  return upload(url, null, "photos", files, onProgress);
};

const photosApi = {
  getAllPhotos,
  uploadPhotos,
  deleteAll,
};
export default photosApi;
