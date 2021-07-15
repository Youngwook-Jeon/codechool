import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignInForm = ({ errors, onSubmitCallback }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    onSubmitCallback({ email, password });
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group control="email">
        <Form.Label>이메일</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group control="password">
        <Form.Label>패스워드</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="패스워드"
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">로그인</Button>
    </Form>
  );
};

export default SignInForm;
