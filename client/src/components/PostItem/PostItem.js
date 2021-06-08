import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';

import {
  addLike,
  removeLike,
  toggleCommentsForm,
} from '../../redux/actions/post';
import CreateComment from '../CreateComment/CreateComment';
import Comments from '../Comments/Comments';

const PostItem = ({
  _id,
  text,
  name,
  avatar,
  user,
  likes,
  comments,
  date,
  toggleComments,
  photo,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <Card className='shadow-sm my-3 p-3'>
      <Row className='mt-3'>
        <Col xs={2}>
          <Link to={`/profile/${user}`}>
            <Image roundedCircle src={avatar} />
          </Link>
        </Col>
        <Col xs={10}>
          <Link to={`/profile/${user}`}>{name}</Link> <br />
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <p>{text}</p>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          {photo && (
            <Image
              fluid
              src={`${process.env.PUBLIC_URL}/assets/images/posts/${photo}`}
            />
          )}
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col className='d-flex align-items-center'>
          {/* like and comment rendering */}
          <div className='border-right pr-3'>
            {likes.length > 0 ? `${likes.length} Likes` : `Like`}
          </div>
          {/* toggle comments */}
          <div
            className='border-right px-3'
            onClick={() => dispatch(toggleCommentsForm(_id))}
          >
            {' '}
            {comments.length > 0 ? `${comments.length} Comments` : `Comment`}
          </div>
          <div className='pl-3'>Share</div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <div className='border-top  w-100'></div>
        </Col>
      </Row>
      <Row className='post-cta--container mt-3'>
        <Col className='d-flex align-items-center justify-content-between'>
          {/* like or unlike cta */}
          <div
            className='post-cta--item'
            onClick={() => {
              if (
                likes.filter((like) => like.user === auth.user._id).length > 0
              ) {
                /*if user already liked */
                dispatch(removeLike(_id));
              } else {
                dispatch(addLike(_id));
              }
            }}
          >
            <i
              className={`fas fa-thumbs-up ${
                likes.filter((like) => like.user === auth.user._id).length > 0
                  ? 'active'
                  : ''
              }`}
            ></i>{' '}
            Like
          </div>
          {/* Comments cta - toggle comments */}
          <div
            className='post-cta--item'
            onClick={() => dispatch(toggleCommentsForm(_id))}
          >
            <i className='fas fa-comment-dots'></i> Comments
          </div>
          <div className='post-cta--item'>
            <i className='fas fa-share'></i> Share
          </div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          {toggleComments ? (
            <Container>
              <CreateComment postId={_id} user={user} />
              <Comments comments={comments} />
            </Container>
          ) : null}
        </Col>
      </Row>
    </Card>
  );
};

export default PostItem;
