import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Alert from '../../components/Alert/Alert';
import { Navbar } from 'react-bootstrap';
import HeroBanner from '../../components/Main/HeroBanner/HeroBanner';
import heroImage from '../../Assets/bg-img-2.jpg';

const SignUpPage = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  //redirect user to dashboard page if user logged in successfully
  if (isAuthenticated && !loading && user) {
    return <Redirect to='/home' />;
  }

  return (
    <Fragment>
      <Row className='sign-up-page'>
        <Navbar fixed='top' className='navbar'>
          <Navbar.Brand className='logo' href='/'>
            DevNet
          </Navbar.Brand>

          <Navbar.Collapse className='justify-content-end'>
            <div className='sign-in__link'>
              Already have an account? <Link to='/'>Sign In</Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Col sm={6}>
          <HeroBanner
            imageSrc={heroImage}
            quote="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            name='Johnathon Doe'
            title='UI Developer'
          />
        </Col>
        <Col sm={6}>
          <Alert />
          <SignUpForm />
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUpPage;
