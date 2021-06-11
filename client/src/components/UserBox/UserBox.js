import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import measureProgress from '../../redux/utils/measureProgress';

const UserBox = ({ user = {}, profile = {}, posts = [] }) => {
  //Check if there is a user profile
  const {
    status,
    social,
    skills,
    company,
    website,
    location,
    bio,
    githubusername,
    experience,
    education,
  } = profile;

  const { name, avatar, _id } = user;

  return (
    <Card className='shadow-sm p-3 mb-3 user-box'>
      <Link to={`/profile/${_id}`}>
        <Card className="user-box-section profile-card">
          <Row className="profile-card-area">
            <Col sm={2} md={6} lg={3} className="prifle-avatar">
              <div
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/posts/${avatar})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                }}
              >
              </div>
            </Col>
            <Col sm={10} md={6} lg={9}>
              <Card.Title>{name}</Card.Title>
              <Card.Text className='text-muted'>{status}</Card.Text>
            </Col>
          </Row>
        </Card>
      </Link>
      <Link to='/setting'>
        <div className="user-box-section profile-progress">
          <Card.Text>
            Profile Ready:{' '}
            <span>
              {measureProgress([
                status,
                social,
                skills,
                company,
                website,
                location,
                bio,
                githubusername,
                experience,
                education,
              ])}
          %
        </span>{' '}
          </Card.Text>
          <ProgressBar
            variant='success'
            now={measureProgress([
              status,
              social,
              skills,
              company,
              website,
              location,
              bio,
              githubusername,
              experience,
              education,
            ])}
          />
          {/* <Button variant="link">Complete Your Profile</Button> */}
        </div>
      </Link>
      {/* <hr /> */}
      <Link to={`/profile/${_id}`}>
        <div className="user-box-section">
          <Card.Text>Total Posts: <span>{posts.length}</span>{' '}</Card.Text>
        </div>
      </Link>
    </Card>
  );
};

export default UserBox;
