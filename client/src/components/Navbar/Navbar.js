import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';
import { clearProfile } from '../../redux/actions/profile';
import { clearPosts } from '../../redux/actions/post';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  return (
    <Navbar
      className='shadow nav-bar-top'
      collapseOnSelect
      bg='light'
      expand='sm'
      fixed='top'
    >
      <Container>
        <LinkContainer to='/home'>
          <Navbar.Brand className="logo">DevNet</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <IndexLinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </IndexLinkContainer>
            <LinkContainer to={`/profile/${auth.user && auth.user._id}`}>
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/setting'>
              <Nav.Link>Setting</Nav.Link>
            </LinkContainer>
            <Nav.Link
              onClick={() => {
                dispatch(logout());
                history.push('/');
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
