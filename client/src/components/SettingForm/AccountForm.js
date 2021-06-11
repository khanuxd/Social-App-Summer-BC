import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';

import { updateUserAccount } from '../../redux/actions/auth';

const AccountForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    date: '',
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, ...user });
    }
  }, [user]);

  const handlePhoto = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalForm = new FormData();
    for (const key of Object.keys(formData)) {
      finalForm.append(key, formData[key]);
    }
    dispatch(updateUserAccount(finalForm));
  };

  return (
    <Form
      autoComplete='off'
      className='form-section'
      id='education'
      onSubmit={handleSubmit}
    >
      <h3>Account Details</h3>
      <Form.Group>
        <Form.Label htmlFor='name'>Full Name *</Form.Label>
        <Form.Control
          id='name'
          type='text'
          name='name'
          placeholder='Your Full Name'
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='email'>Email Address *</Form.Label>
        <Form.Control
          id='email'
          type='email'
          name='email'
          placeholder='eg: abc@email.com '
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId='formFile' className='form-section'>
        <Form.Label>Create or Update An Avatar</Form.Label>
        <Form.Control type='file' name='avatar' onChange={handlePhoto} />
        {user && user.avatar && (
          <Image
            width='80px'
            src={`${process.env.PUBLIC_URL}/assets/images/posts/${user.avatar}`}
          />
        )}
      </Form.Group>
      <Form.Group>
        Joined At: <Moment format='MMMM, DD, YYYY'>{formData.date}</Moment>
      </Form.Group>

      <Button className="form-submit" type='submit'>Save</Button>
    </Form>
  );
};

export default AccountForm;
