import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const AllUsers = ({ profiles }) => {
  return (
    <Fragment>
      <Card className='p-3 mb-3 single-user-profile'>
        {profiles.map((profile) => (
          <Link to={`/profile/${profile.user._id}`} key={profile._id}>
            <Card className='user-profile-card'>
              <Row>
                <Col sm={3} className='user-avatar'>
                  <div
                    style={{
                      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/posts/${profile.user.avatar})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                    }}
                  />
                </Col>
                <Col sm={9} className='user-info'>
                  <Card.Title>{profile.user.name}</Card.Title>
                  <p className='text-muted'>{profile.status || 'updating'}</p>
                </Col>
              </Row>
            </Card>
          </Link>
        ))}
      </Card>
    </Fragment>
  );
};

export default AllUsers;
