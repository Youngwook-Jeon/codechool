import axios from "axios";
import jwt_decoded from "jwt-decode";
import { LOGIN_ENDPOINT } from "../helpers/endpoints";
import { SET_CURRENT_USER } from "./types";
import setAuthToken from "../helpers/setAuthToken";

export const loginUser = (userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(LOGIN_ENDPOINT, userData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { authorization, userId } = response.headers;
        localStorage.setItem("jwtToken", authorization);
        setAuthToken(authorization);
        const decoded = jwt_decoded(authorization);
        dispatch(setCurrentUser({ user: decoded, loggedIn: true }));
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setCurrentUser = ({ user, loggedIn }) => {
  return {
    type: SET_CURRENT_USER,
    payload: { user, loggedIn },
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(
    setCurrentUser({
      user: {},
      loggedIn: false,
    })
  );
};
