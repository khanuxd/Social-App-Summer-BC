import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Image, Spinner } from 'react-bootstrap';
import { createAndUpdateProfile } from '../../redux/actions/profile';

const PersonalInfoForm = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    bio: '',
    avatar: '',
    status: '',
    skills: '',
    company: '',
    location: '',
    website: '',
    githubusername: '',
    _id: '',
    user: '',
    experience: [],
    education: [],
    date: '',
    social: {},
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  useEffect(() => {
    setFormData({ ...profile });
    if (profile) {
      setFormData({ ...profile, skills: profile.skills.join(', ') });
      profile.social &&
        profile.social.twitter &&
        setFormData((prevState) => ({
          ...prevState,
          twitter: profile.social.twitter,
        }));
      profile.social &&
        profile.social.youtube &&
        setFormData((prevState) => ({
          ...prevState,
          youtube: profile.social.youtube,
        }));
      profile.social &&
        profile.social.facebook &&
        setFormData((prevState) => ({
          ...prevState,
          facebook: profile.social.facebook,
        }));
      profile.social &&
        profile.social.instagram &&
        setFormData((prevState) => ({
          ...prevState,
          instagram: profile.social.instagram,
        }));
      profile.social &&
        profile.social.linkedin &&
        setFormData((prevState) => ({
          ...prevState,
          linkedin: profile.social.linkedin,
        }));
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalForm = new FormData();
    for (const key of Object.keys(formData)) {
      finalForm.append(key, formData[key]);
    }

    dispatch(createAndUpdateProfile(finalForm));
  };

  return profile ? (
    <Form
      autoComplete='off'
      className='form-section'
      id='personal'
      onSubmit={handleSubmit}
    >
      <h3>Personal Information</h3>

      <Form.Group className='form-sub-section'>
        <Form.Label htmlFor='bio'>About</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          type='text'
          id='bio'
          name='bio'
          placeholder='Tell about yourself'
          onChange={handleChange}
          value={formData.bio}
        />
      </Form.Group>
      <Form.Group controlId='formFile' className='form-sub-section'>
        <Form.Label>Upload or Update An Profile Banner</Form.Label>
        <Form.Control type='file' name='avatar' onChange={handlePhoto} />
        {profile && profile.avatar && (
          <Image
            width='80px'
            src={`${process.env.PUBLIC_URL}/assets/images/posts/${profile.avatar}`}
          />
        )}
      </Form.Group>
      <Form.Group className='form-sub-section'>
        <Form.Label htmlFor='status'>Role</Form.Label>
        <Form.Control
          id='status'
          type='text'
          name='status'
          placeholder='eg: UX Developer'
          onChange={handleChange}
          value={formData.status}
        />
      </Form.Group>
      <Form.Group className='form-sub-section'>
        <Form.Label htmlFor='skills'>Skills *</Form.Label>
        <Form.Control
          id='skills'
          type='text'
          name='skills'
          placeholder='eg: HTML, CSS, JS...'
          required
          onChange={handleChange}
          value={formData.skills}
        />
      </Form.Group>
      <Form.Group className='form-sub-section'>
        <Row>
          <Col>
            <Form.Label htmlFor='company'>Company</Form.Label>
            <Form.Control
              id='company'
              type='text'
              name='company'
              placeholder='eg: Your current company'
              onChange={handleChange}
              value={formData.company}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className='form-sub-section'>
        <Row>
          <Col>
            <Form.Label htmlFor='location'>Location</Form.Label>
            <Form.Control
              id='location'
              type='text'
              name='location'
              placeholder='eg: Helsinki, Finland'
              onChange={handleChange}
              value={formData.location}
            />
          </Col>
          <Col>
            <Form.Label htmlFor='website'>Website</Form.Label>
            <Form.Control
              id='website'
              type='text'
              name='website'
              placeholder='Your website'
              onChange={handleChange}
              value={formData.website}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className='form-sub-section'>
        <Row>
          <Col>
            <Form.Label htmlFor='githubusername'>GitHub Username</Form.Label>
            <Form.Control
              id='githubusername'
              type='text'
              name='githubusername'
              placeholder='eg: johndoe123'
              onChange={handleChange}
              value={formData.githubusername}
            />
          </Col>
          <Col>
            <Form.Label htmlFor='linkedin'>Linked Account</Form.Label>
            <Form.Control
              id='linkedin'
              type='text'
              name='linkedin'
              placeholder='Your linkedin'
              onChange={handleChange}
              value={formData.linkedin}
            />
          </Col>
        </Row>

      </Form.Group>
      <Form.Group className='form-sub-section'>
        <Row>
          <Col>
            <Form.Label htmlFor='twitter'>Twitter</Form.Label>
            <Form.Control
              id='twitter'
              type='text'
              name='twitter'
              placeholder='Your Twitter Account'
              onChange={handleChange}
              value={formData.twitter}
            />
          </Col>
          <Col>
            <Form.Label htmlFor='youtube'>Youtube Channel</Form.Label>
            <Form.Control
              id='youtube'
              type='text'
              name='youtube'
              placeholder='Your Youtube'
              onChange={handleChange}
              value={formData.youtube}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className='form-sub-section'>
        <Row>
          <Col>
            <Form.Label htmlFor='facebook'>Facebook</Form.Label>
            <Form.Control
              id='facebook'
              type='text'
              name='facebook'
              placeholder='Your Facebook Account'
              onChange={handleChange}
              value={formData.facebook}
            />
          </Col>
          <Col>
            <Form.Label htmlFor='instagram'>Instagram</Form.Label>
            <Form.Control
              id='instagram'
              type='text'
              name='instagram'
              placeholder='Your Instagram'
              onChange={handleChange}
              value={formData.instagram}
            />
          </Col>
        </Row>
      </Form.Group>
      <Button className="form-submit" type='submit'>Save</Button>
    </Form>
  ) : (
    <Spinner />
  );
};

export default PersonalInfoForm;
