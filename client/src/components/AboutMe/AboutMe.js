import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'react-moment';

const AboutMe = ({
  social,
  company,
  website,
  location,
  status,
  skills,
  bio,
  githubusername,
  _id,
  user,
  experience,
  education,
  date,
}) => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  return (
    <Card className='shadow-sm mt-3 p-3'>
      {auth.user._id === user._id ? (
        <Link to='/setting'>
          <div className='d-flex justify-content-between'>
            <h6>About Me</h6>
            <i className='fas fa-edit'></i>
          </div>
        </Link>
      ) : (
        <h6>About Me</h6>
      )}
      <Row className='mt-3'>
        <Col>
          <div className='border-top w-100'></div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <small>{bio ? bio : 'Say Something About Yourself'}</small> {' - '}
          <small>{status ? status : 'What is your status?'}</small>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <div className='border-top w-100'></div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <i className='fas fa-map-marker-alt'></i>{' '}
          <small>{location ? location : 'Your Location'}</small>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <i className='fas fa-briefcase'></i>{' '}
          <small>{website ? website : 'Your website'}</small>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <i className='fas fa-building'></i>{' '}
          <small>{company ? website : 'Your company'}</small>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <i className='fab fa-github'></i>{' '}
          {githubusername ? (
            <small>
              <a
                href={`https://github.com/${githubusername}`}
                target='_blank'
                rel='noreferrer'
              >
                {githubusername}
              </a>
            </small>
          ) : (
            <small>Your Github</small>
          )}
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <i className='fas fa-calendar-day'></i>{' '}
          <small>
            Joined <Moment format='MMMM, YYYY'>{date}</Moment>
          </small>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <div className='border-top w-100'></div>
        </Col>
      </Row>
      <Row className='mt-3'>
        {skills.length === 0 ? (
          <Col>
            <small>Enter Your Skills</small>
          </Col>
        ) : (
          <Col>
            {skills.map((skill, i) => (
              <span key={i} className='badge bg-primary text-white mr-1'>
                {skill}
              </span>
            ))}
          </Col>
        )}
      </Row>
      {profile.repos.length > 0 && (
        <Fragment>
          <Row className='my-3'>
            <Col>
              <div className='border-top w-100'></div>
            </Col>
          </Row>
          <h6>Repos List</h6>
          {profile.repos.map((repo) => (
            <Row key={repo.id}>
              <Col>
                <a href={repo.html_url} target='_blank' rel='noreferrer'>
                  <small>
                    <i className='fas fa-project-diagram'></i> {repo.name}
                  </small>
                </a>
              </Col>
            </Row>
          ))}
        </Fragment>
      )}
    </Card>
  );
};

export default AboutMe;
