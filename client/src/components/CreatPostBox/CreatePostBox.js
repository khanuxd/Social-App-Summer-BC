import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addPost } from '../../redux/actions/post';

const CreatePostBox = () => {
  const {
    user: { avatar, _id },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    text: '',
    photos: '',
  });

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handlePhotos = (e) => {
    setNewPost({ ...newPost, photos: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.text) return;

    const formData = new FormData();
    formData.append('text', newPost.text);

    for (const key of Object.keys(newPost.photos)) {
      formData.append('photos', newPost.photos[key]);
    }

    //send form
    dispatch(addPost(formData));
    //clear form
    setNewPost({ text: '', photos: '' });
  };

  return (
    <Card className='shadow-sm p-3 mb-3 create-post-box'>
      <Row>
        <Col xs={2} className='post-avatar'>
          <Link to={`/profile/${_id}`}>
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
            />
          </Link>
        </Col>
        <Col xs={10}>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input
              className='form-control'
              type='text'
              placeholder='What is in your mind?'
              name='text'
              value={newPost.text}
              onChange={handleChange}
              required
            />
            <div className='d-flex justify-content-between mt-3 create-post-bottom'>
              <label className='photo-input--post'>
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  name='photos'
                  onChange={handlePhotos}
                  multiple
                />
                <i className='fas fa-image'></i> Photos
              </label>
              <Button className="create-post-btn" type='submit'>Create Post</Button>
            </div>
          </form>
        </Col>
      </Row>
    </Card>
  );
};

export default CreatePostBox;
