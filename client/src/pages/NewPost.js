import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NewPostForm from "../components/forms/NewPostForm";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { loginUser } from "../actions/authActions";

const NewPost = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const history = useHistory();

  const login = ({ email, password }) => {
    const errors = {};
    setErrors(errors);

    if (!validator.isEmail(email)) {
      errors.email = "유효하지 않은 이메일입니다.";
    }

    if (validator.isEmpty(password)) {
      errors.password = "패스워드를 입력하세요.";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    dispatch(loginUser({ email, password }))
      .then((response) => {})
      .catch((err) => {
        setErrors({ auth: "로그인에 실패했습니다. 다시 시도해주세요." });
      });
  };
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col sm="12" lg={{ span: 10, offset: 1 }}>
          <Card body>
            {errors.auth && <Alert variant="danger">{errors.auth}</Alert>}
            <h3>로그인</h3>
            <hr />
            <NewPostForm errors={errors} onSubmitCallback={login}></NewPostForm>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewPost;
