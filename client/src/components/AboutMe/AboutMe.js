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
    <Card className='shadow-sm mt-3 p-3 about-me'>
      {auth.user._id === user._id ? (
        <Link to='/setting'>
          <div className='d-flex justify-content-between about-me-heading'>
            <h5>About Me</h5>
            <span><i class="fas fa-pen"></i> edit</span>
          </div>
        </Link>
      ) : (
        <h6>About Me</h6>
      )}
      <Row className='mt-3 profile-bio'>
        <Col>
          <p>{bio ? bio : 'Say Something About Yourself'}</p> {' - '}
          <span className="status">{status ? status : 'What is your status?'}</span>
        </Col>
      </Row>
      <Row className='mt-3 key-items'>
        <Col>
          <i className='fas fa-map-marker-alt'></i>{' '}
          <small>{location ? location : 'Your Location'}</small>
        </Col>
      </Row>
      <Row className='mt-3 key-items'>
        <Col>
          <i class="fas fa-globe"></i>{' '}
          <small>{website ? website : 'Your website'}</small>
        </Col>
      </Row>
      <Row className='mt-3 key-items'>
        <Col>
          <i className='fas fa-briefcase'></i>{' '}
          <small>{company ? website : 'Your company'}</small>
        </Col>
      </Row>
      <Row className='mt-3 key-items'>
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
      <Row className='mt-3 key-items'>
        <Col>
          <i className='fas fa-calendar-day'></i>{' '}
          <small>
            Joined <Moment format='MMMM, YYYY'>{date}</Moment>
          </small>
        </Col>
      </Row>
      <Row className='mt-3 skills-list'>
        {skills.length === 0 ? (
          <Col>
            <small>Enter Your Skills</small>
          </Col>
        ) : (
          <Col className="skills-badge">
            {skills.map((skill, i) => (
              <span key={i} className='badge bg-primary text-white mr-1 skills-badge-item'>
                {skill}
              </span>
            ))}
          </Col>
        )}
      </Row>
      {profile.repos.length > 0 && (
        <div className="repos-list">
          <Fragment>
            <h5>Repos List</h5>
            {profile.repos.map((repo) => (
              <Row key={repo.id} className="repo-list-item">
                <Col>
                  <a href={repo.html_url} target='_blank' rel='noreferrer'>
                    <small>
                      <i className='fas fa-project-diagram'></i> <span>{repo.name}</span>
                    </small>
                  </a>
                </Col>
              </Row>
            ))}
          </Fragment>
        </div>
      )}
    </Card>
  );
};

export default AboutMe;
