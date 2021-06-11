import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomNavbar from '../../components/Navbar/Navbar';
import Spinner from '../../components/Spinner/Spinner';
import UserBox from '../../components/UserBox/UserBox';
import CreatePostBox from '../../components/CreatPostBox/CreatePostBox';
import Posts from '../../components/Posts/Posts';
import { getAllProfiles, getCurrentProfile } from '../../redux/actions/profile';
import { getCurrentUserPosts, getPosts } from '../../redux/actions/post';
import AllUsers from '../../components/AllUsers/AllUsers';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (auth.token) {
      //get current profile
      dispatch(getCurrentProfile());
      //get current user Posts
      dispatch(getCurrentUserPosts(auth.user._id));
      //get all posts
      dispatch(getPosts());
      //get all profiles
      dispatch(getAllProfiles());
    }
  }, [auth.token, dispatch, auth.user]);

  return auth.user && post.posts && profile.profile && profile.profiles ? (
    <Fragment>
      <CustomNavbar />
      <Container className='homepage-content'>
        <Row className="homepage-conent-area">
          <Col md={12} lg={4} className='left-sidebar'>
            <UserBox
              user={auth.user}
              profile={profile.profile}
              posts={post.currentUserPosts}
            />
            <AllUsers profiles={profile.profiles} />
          </Col>
          <Col md={12} lg={8} className="right-side-content">
            <CreatePostBox />
            <Posts posts={post.posts} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  ) : (
    <Spinner />
  );
};

export default HomePage;
