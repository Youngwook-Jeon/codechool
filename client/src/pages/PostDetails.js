import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { POST_DETAILS_ENDPOINT } from "../helpers/endpoints";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${POST_DETAILS_ENDPOINT}/${id}`)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((e) => {
        history.push("/");
      });
  }, []);

  return <div>post details</div>;
};

export default PostDetails;
