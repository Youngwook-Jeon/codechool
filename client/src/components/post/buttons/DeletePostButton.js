import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { DELETE_POST_ENDPOINT } from "../../../helpers/endpoints";
import { useDispatch } from "react-redux";
import { getUserPosts } from "../../../actions/postActions";
import { toast } from "react-toastify";

const DeletePostButton = ({ postId, title }) => {
  const dispatch = useDispatch();

  const createAlert = () => {
    confirmAlert({
      title: "포스트 삭제",
      message: `"${title}" 포스트를 정말로 삭제하시겠습니까?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePost();
          },
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  const deletePost = async () => {
    try {
      await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`);
      await dispatch(getUserPosts());
      toast.info("포스트가 성공적으로 삭제되었습니다.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <Button onClick={createAlert} variant="primary" size="sm">
      삭제
    </Button>
  );
};

export default DeletePostButton;
