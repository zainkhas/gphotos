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
      });
  });
};
