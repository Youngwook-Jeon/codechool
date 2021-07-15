import axios from "axios";
import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import Post from "../components/post/Post";
import { PUBLIC_POSTS_ENDPOINT } from "../helpers/endpoints";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios
      .get(PUBLIC_POSTS_ENDPOINT)
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
          <h1>최신 공개 포스트들</h1>
      </Jumbotron>
      <div>
          {posts.map(post => <Post key={post.postId} post={post}></Post>)}
      </div>
  </div>;
};

export default Posts;
