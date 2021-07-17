import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserPosts } from "../actions/postActions";
import Post from "../components/post/Post";
import Placeholder from "../components/utils/Placeholder";
import NoPosts from "../utils/NoPosts";

const UserPosts = () => {
  const [fetching, setFetching] = useState(true);
  const fetched = useSelector((state) => state.posts.fetched);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchedPosts() {
      if (!fetched) {
        try {
          setFetching(true);
          await dispatch(getUserPosts());
        } catch (err) {
          toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
          });
        }
      }
    }
    fetchedPosts();
    setFetching(false);
  }, []);

  return (
    <div>
      <Jumbotron>
        <h1>나의 포스트 목록</h1>
      </Jumbotron>
      {fetching && <Placeholder></Placeholder>}
      {!fetching && posts.length === 0 && <NoPosts text="내 포스트가 존재하지 않습니다."></NoPosts>}
      <div>
        {posts.map((post) => (
          <Post key={post.postId} post={post} renderControls={true}></Post>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
