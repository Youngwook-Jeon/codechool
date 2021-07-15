import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInForm from "../components/forms/SignInForm";

const SignIn = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            <h2>로그인</h2>
            <SignInForm errors={{}} onSubmitCallback={null}></SignInForm>
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
