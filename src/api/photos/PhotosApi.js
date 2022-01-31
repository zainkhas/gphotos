import { URL_API } from "../../config";
import { post, upload } from "../HttpClient";

const getAllPhotos = async () => {
  let url = URL_API + "/photos";
  return post(url);
};

const getTrashedPhotos = async () => {
  let url = URL_API + "/trashedphotos";
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

const trashPhoto = (ids) => {
  let url = URL_API + "/photos/trash";
  return post(url, { ids });
};

const photosApi = {
  getAllPhotos,
  uploadPhotos,
  deleteAll,
  trashPhoto,
  getTrashedPhotos,
};
export default photosApi;
