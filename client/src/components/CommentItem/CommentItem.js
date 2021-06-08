import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const CommentItem = ({ text, name, avatar, user }) => {
  return (
    <Row className='mt-2'>
      <Col xs={2}>
        <Link to={`/profile/${user}`}>
          <Image roundedCircle src={avatar} />
        </Link>
      </Col>
      <Col xs={10} className='border'>
        <Link to={`/profile/${user}`}>
          <small>{name}</small>
        </Link>
        <p>{text}</p>
      </Col>
    </Row>
  );
};

export default CommentItem;
