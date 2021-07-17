import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import NewPostForm from "../components/forms/NewPostForm";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { exposures } from "../helpers/exposures";
import {
  UPDATE_POST_ENDPOINT,
  POST_DETAILS_ENDPOINT,
} from "../helpers/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserPosts } from "../actions/postActions";

const EditPost = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${POST_DETAILS_ENDPOINT}/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((e) => {
        history.push("/");
      });
  }, []);

  const editPost = async ({ title, content, expirationTime, exposureId }) => {
    const errors = {};
    setErrors(errors);

    if (validator.isEmpty(title)) {
      errors.title = "제목을 입력하세요.";
    }

    if (validator.isEmpty(content)) {
      errors.content = "내용을 작성하세요.";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    expirationTime = exposureId == exposures.PRIVATE ? 0 : expirationTime;

    try {
      const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post.postId}`, {
        title,
        content,
        expirationTime,
        exposureId,
      });
      await dispatch(getUserPosts());
      toast.info("포스트가 성공적으로 수정되었습니다.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
      history.push(`/post/${response.data.postId}`);
    } catch (err) {
      setErrors({ editpost: err.response.data.message });
    }
  };
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm="12" lg={{ span: 10, offset: 1 }}>
          <Card body>
            {errors.editpost && <Alert variant="danger">{errors.editpost}</Alert>}
            <h3>포스트 수정하기</h3>
            <hr />
            {post && (
              <NewPostForm
                errors={errors}
                onSubmitCallback={editPost}
                pTitle={post.title}
                pContent={post.content}
                pExposureId={post.exposureId}
                textButton="수정완료"
              ></NewPostForm>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPost;
