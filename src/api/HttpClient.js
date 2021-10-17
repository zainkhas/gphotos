import axios from "axios";
import { log } from "../common/Common";

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((response) => {
        log("REQUEST SUCCESSFUL ", {
          url,
          params,
          response: response.data,
        });
        resolve(response.data);
      })
      .catch((error) => {
        log("REQUEST FAILED ", {
          url,
          params,
          error,
        });
        reject(error);
      });
  });
};

export const upload = (url, params, filesKey, files, onProgress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    files.map((file) => formData.append(filesKey, file));

    axios({
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      },
    })
      .then((response) => {
        log("REQUEST SUCCESSFUL ", {
          url,
          params,
          response: response.data,
        });
        resolve(response.data);
      })
      .catch((error) => {
        log("REQUEST FAILED ", {
          url,
          params,
          error,
        });
        reject(error);
      });
  });
};
