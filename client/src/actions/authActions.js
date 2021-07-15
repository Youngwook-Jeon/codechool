import axios from "axios";
import { LOGIN_ENDPOINT } from "../helpers/endpoints";

export const loginUser = (userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(LOGIN_ENDPOINT, userData, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
