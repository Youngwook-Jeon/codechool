import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";
import { loginUser, registerUser } from "../actions/authActions";
import SignUpForm from "../components/forms/SignUpForm";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  });

  const register = ({ email, password, firstName, lastName }) => {
    const errors = {};
    setErrors(errors);

    if (!validator.isEmail(email)) {
      errors.email = "유효하지 않은 이메일입니다.";
    }

    if (!validator.isLength(password, { min: 8, max: 30 })) {
      errors.password = "8자이상, 30자 이하로 입력하세요.";
    }

    if (validator.isEmpty(firstName)) {
      errors.firstName = "이름을 입력하세요.";
    }

    if (validator.isEmpty(lastName)) {
      errors.lastName = "성씨를 입력하세요.";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }

    dispatch(registerUser({ email, password, firstName, lastName }))
      .then((response) => {
          dispatch(loginUser({ email, password }));
      })
      .catch((err) => {
        setErrors({ registerError: err.response.data.message });
      });
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            {errors.registerError && <Alert variant="danger">{errors.registerError}</Alert>}
            <h3>가입하기</h3>
            <hr />
            <SignUpForm errors={errors} onSubmitCallback={register}></SignUpForm>
            <div className="mt-4">
              <Link to={"/signin"}>
                이미 계정이 있으신가요? 로그인하러 가기
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
