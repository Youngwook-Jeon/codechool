import axios from "axios";
import { SET_USER_POSTS } from "./types";
import { USER_POST_ENDPOINT } from "../helpers/endpoints";

export const getUserPosts = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(USER_POST_ENDPOINT)
      .then((response) => {
        dispatch({
          type: SET_USER_POSTS,
          payload: { fetched: true, posts: response.data },
        });

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
