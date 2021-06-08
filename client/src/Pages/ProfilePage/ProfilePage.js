import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Spinner from '../../components/Spinner/Spinner';
import CustomNavbar from '../../components/Navbar/Navbar';
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import {
  getUserProfileById,
  clearUserProfileById,
} from '../../redux/actions/profile';
import UserBox from '../../components/UserBox/UserBox';
import CreatePostBox from '../../components/CreatPostBox/CreatePostBox';
import Posts from '../../components/Posts/Posts';
import { getCurrentUserPosts } from '../../redux/actions/post';

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
      <section className='profilepage-content'>
        <div className='text-center'>
          <h4>{profileById.user.name}</h4>
          <span>{profileById.status}</span>
        </div>
        <Row className='px-5'>
          <Col xs={4}>
            <UserBox
              user={profileById.user}
              profile={profileById}
              posts={currentUserPosts}
            />
          </Col>
          <Col xs={8}>
            {auth.user._id === userId && <CreatePostBox />}
            <Posts posts={currentUserPosts} />
          </Col>
        </Row>
      </section>
    </Fragment>
  ) : (
    <Spinner />
  );
};

export default ProfilePage;
