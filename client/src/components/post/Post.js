import React from "react";
import { Badge, Card, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import { exposures } from "../../helpers/exposures";
import DeletePostButton from "./buttons/DeletePostButton";

const Post = ({ post, renderControls }) => {
  return (
    <Card className="mb-4">
      {renderControls && (
        <Card.Header className="d-flex justify-content-between">
          <div>
            <Badge variant="secondary" className="mr-2">
              {post.exposure.type}
            </Badge>
            {post.expired && post.exposure.id === exposures.PUBLIC && (
              <Badge variant="danger" className="mr-2">
                expired
              </Badge>
            )}
          </div>
          <div>
            <Button
              variant="primary"
              size="sm"
              className="mr-2"
              as={NavLink}
              to={`editpost/${post.postId}`}
            >
              수정
            </Button>
            <DeletePostButton
              postId={post.postId}
              title={post.title}
            ></DeletePostButton>
          </div>
        </Card.Header>
      )}
      <Card.Body>
        <Card.Title>
          <Link to={`/post/${post.postId}`}>{post.title}</Link>
        </Card.Title>
        <Card.Text>
          작성자: {post.user.firstName}, {moment(post.createdAt).fromNow()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
