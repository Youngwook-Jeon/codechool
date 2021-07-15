import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SignInForm from "../components/forms/SignInForm";
import validator from "validator";
import { isObjEmpty } from "../helpers/helpers";

const SignIn = () => {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {

    });

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


    }
  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            <h2>로그인</h2>
            <SignInForm errors={errors} onSubmitCallback={login}></SignInForm>
            <div className="mt-4">
                <Link to={"/signup"}>계정이 없으신가요? 가입하러 가기</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
