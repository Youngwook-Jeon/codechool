import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { exposures } from "../../helpers/exposures";

const NewPostForm = ({
  errors,
  onSubmitCallback,
  pTitle = "",
  pContent = "",
  pExposureId = exposures.PUBLIC,
  pExpirationTime = 60,
  textButton = "작성완료",
}) => {
  const [title, setTitle] = useState(pTitle);
  const [content, setContent] = useState(pContent);
  const [expirationTime, setExpirationTime] = useState(pExpirationTime);
  const [exposureId, setExposureId] = useState(pExposureId);

  const submitForm = (e) => {
    e.preventDefault();
    onSubmitCallback({ title, content, expirationTime, exposureId });
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group control="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          isInvalid={errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md="6" xs="12">
          <Form.Group controlId="expirationTime">
            <Form.Label>만료 시간</Form.Label>
            <Form.Control
              disabled={exposureId == exposures.PRIVATE}
              as="select"
              value={expirationTime}
              onChange={(e) => setExpirationTime(e.target.value)}
            >
              <option value="30">30분</option>
              <option value="60">1시간</option>
              <option value="120">2시간</option>
              <option value="360">6시간</option>
              <option value="720">12시간</option>
              <option value="1440">24시간</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.expirationTime}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md="6" xs="12">
          <Form.Group controlId="exposureId">
            <Form.Label>포스트 분류</Form.Label>
            <div>
              <Form.Check
                onChange={(e) => setExposureId(e.target.value)}
                checked={exposureId == exposures.PRIVATE}
                value={exposures.PRIVATE}
                inline
                label="Private"
                name="exposureId"
                type="radio"
              ></Form.Check>

              <Form.Check
                onChange={(e) => setExposureId(e.target.value)}
                checked={exposureId == exposures.PUBLIC}
                value={exposures.PUBLIC}
                inline
                label="Public"
                name="exposureId"
                type="radio"
              ></Form.Check>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.expirationTime}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group control="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          isInvalid={errors.content}
        />
        <Form.Control.Feedback type="invalid">
          {errors.content}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        {textButton}
      </Button>
    </Form>
  );
};

export default NewPostForm;
