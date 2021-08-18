import { post } from "../HttpClient";

const URL = "http://localhost/api";

const getAllPhotos = async () => {
  let url = URL + "/photos";
  return post(url);
};

const getPhotosUploadUrl = () => {
  let url = URL + "/photos/upload";
  return url;
};

const photosApi = {
  getAllPhotos,
  getPhotosUploadUrl,
};
export default photosApi;
