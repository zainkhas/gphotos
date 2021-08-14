import { post } from "../HttpClient";

const URL = "http://localhost:3000";

const getAllPhotos = async () => {
  let url = URL + "/photos";
  return post(url);
};

const photosApi = {
  getAllPhotos,
};
export default photosApi;
