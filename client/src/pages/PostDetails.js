import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { POST_DETAILS_ENDPOINT } from "../helpers/endpoints";
import { Card, Jumbotron, Button } from "react-bootstrap";
import moment from "moment";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${POST_DETAILS_ENDPOINT}/${id}`)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((e) => {
        history.push("/");
      });
  }, []);

  return (
    <div className="pb-4">
      {post && (
        <React.Fragment>
          <Jumbotron>
            <h1>{post.title}</h1>
            <p>
              작성자: {post.user.firstName}, {moment(post.createdAt).fromNow()}
            </p>
          </Jumbotron>

          <Card>
            <Card.Header>
              <Button
                className="mr-2"
                variant="primary"
                size="sm"
                onClick={() => {}}
              >
                다운로드
              </Button>
              <Button variant="primary" size="sm" onClick={() => {}}>
                클립보드에 복사
              </Button>
            </Card.Header>
            <Card.Body>
              <SyntaxHighlighter showLineNumbers={true}>{post.content}</SyntaxHighlighter>
            </Card.Body>
          </Card>
        </React.Fragment>
      )}
    </div>
  );
};

export default PostDetails;
