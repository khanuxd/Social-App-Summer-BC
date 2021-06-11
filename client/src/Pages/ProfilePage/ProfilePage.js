import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Spinner from '../../components/Spinner/Spinner';
import CustomNavbar from '../../components/Navbar/Navbar';
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import { getUserProfileById, clearUserProfileById } from '../../redux/actions/profile';
import UserBox from '../../components/UserBox/UserBox';
import CreatePostBox from '../../components/CreatPostBox/CreatePostBox';
import Posts from '../../components/Posts/Posts';
import { getCurrentUserPosts } from '../../redux/actions/post';
import AboutMe from '../../components/AboutMe/AboutMe';
import { Container } from 'react-bootstrap';

const ProfilePage = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { profileById } = useSelector((state) => state.profile);
  const { currentUserPosts } = useSelector((state) => state.post);

  useEffect(() => {
    //checking if the user logged in
    if (auth.token) {
      //get profile
      dispatch(getUserProfileById(userId));
      //get posts
      dispatch(getCurrentUserPosts(userId));
    }
    //if component will unmount
    return () => {
      dispatch(clearUserProfileById());
    };
  }, [dispatch, userId, auth.token]);

  return profileById ? (
    <Fragment>
      <CustomNavbar />
      <ProfileBanner />
      <Container className='profilepage-content'>
        <div className='text-center mb-3 pofile-picture'>
          <h4>{profileById.user.name}</h4>
          <span>{profileById.status}</span>
        </div>
        <Row>
          <Col md={12} lg={4} >
            <UserBox
              user={profileById.user}
              profile={profileById}
              posts={currentUserPosts}
            />
            <AboutMe {...profileById} />
          </Col>
          <Col md={12} lg={8} >
            {auth.user._id === userId && <CreatePostBox />}
            <Posts posts={currentUserPosts} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  ) : (
    <Spinner />
  );
};

export default ProfilePage;
