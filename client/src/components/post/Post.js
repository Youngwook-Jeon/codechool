import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>
                    <Link to={"/"}>{post.title}</Link>
                </Card.Title>
                <Card.Text>
                    작성자: {post.user.firstName}, {" "}{post.createdAt}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Post;