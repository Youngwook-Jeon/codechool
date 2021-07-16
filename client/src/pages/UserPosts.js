import axios from "axios";
import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import Post from "../components/post/Post";
import Placeholder from "../components/utils/Placeholder";
import { USER_POST_ENDPOINT } from "../helpers/endpoints";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(USER_POST_ENDPOINT)
      .then((response) => {
        setPosts(response.data);
        setFetching(false);
      })
      .catch((e) => {
        console.error(e);
        setFetching(false);
      });
  }, []);

  return <div>
      <Jumbotron>
          <h1>나의 포스트 목록</h1>
      </Jumbotron>
      {fetching && <Placeholder></Placeholder>}
      <div>
          {posts.map(post => <Post key={post.postId} post={post} renderControls={true}></Post>)}
      </div>
  </div>;
};

export default UserPosts;
