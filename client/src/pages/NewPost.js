import React, { useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NewPostForm from "../components/forms/NewPostForm";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { exposures } from "../helpers/exposures";
import { CREATE_POST_ENDPOINT } from "../helpers/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserPosts } from "../actions/postActions";

const NewPost = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const createPost = async ({ title, content, expirationTime, exposureId }) => {
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

    expirationTime = parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime;

    try {
      const response = await axios.post(CREATE_POST_ENDPOINT, {
        title,
        content,
        expirationTime,
        exposureId,
      });
      await dispatch(getUserPosts());
      toast.info("포스트가 성공적으로 작성되었습니다.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
      history.push(`/post/${response.data.postId}`);
    } catch (err) {
      setErrors({ newpost: err.response.data.message });
    }
  };
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm="12" lg={{ span: 10, offset: 1 }}>
          <Card body>
            {errors.newpost && <Alert variant="danger">{errors.newpost}</Alert>}
            <h3>포스트 작성하기</h3>
            <hr />
            <NewPostForm
              errors={errors}
              onSubmitCallback={createPost}
            ></NewPostForm>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewPost;
