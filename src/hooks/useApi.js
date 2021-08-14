import photosApi from "../api/photos/PhotosApi";
const useApi = () => {
  return { ...photosApi };
};

export default useApi;
