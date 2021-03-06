import axios from "axios";
import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import Post from "../components/post/Post";
import Placeholder from "../components/utils/Placeholder";
import { PUBLIC_POSTS_ENDPOINT } from "../helpers/endpoints";
import NoPosts from "../utils/NoPosts";

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
      {fetching && <Placeholder></Placeholder>}
      {!fetching && posts.length === 0 && <NoPosts text="포스트가 없습니다."></NoPosts>}
      <div>
          {posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post>)}
      </div>
  </div>;
};

export default Posts;
