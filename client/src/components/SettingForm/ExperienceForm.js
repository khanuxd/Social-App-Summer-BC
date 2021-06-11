import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { createExperience } from '../../redux/actions/profile';

const ExperienceForm = () => {
  const [toDisabled, setToDisabled] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    current: false,
    from: '',
    to: '',
    description: '',
  });

  const { company, title, location, current, from, description, to } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createExperience(formData));

    //clear form
    setFormData({
      company: '',
      title: '',
      location: '',
      current: false,
      from: '',
      to: '',
      description: '',
    });
    setToDisabled(false);
  };

  return (
    <Form
      autoComplete='off'
      className='form-section'
      id='experience'
      onSubmit={handleSubmit}
    >
      <h3>Experience</h3>
      <Form.Group>
        <Form.Label htmlFor='company'>Company Name *</Form.Label>
        <Form.Control
          id='company'
          type='text'
          name='company'
          placeholder='eg: Business College helsinki'
          required
          value={company}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Row>
          <Col>
            <Form.Label htmlFor='title'>Title *</Form.Label>
            <Form.Control
              id='title'
              type='text'
              name='title'
              placeholder='eg: UX Developer'
              required
              value={title}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Label htmlFor='location'>Location</Form.Label>
            <Form.Control
              id='location'
              type='text'
              name='location'
              placeholder='eg: Helsinki, Finland'
              value={location}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Check
          type='checkbox'
          label='Currently Working Here'
          name='current'
          checked={current}
          value={current}
          onChange={() => {
            setFormData({ ...formData, current: !current, to: '' });
            setToDisabled(!toDisabled);
          }}
        />
      </Form.Group>
      <Form.Group className='combined-field'>
        <Row>
          <Col>
            <Form.Label htmlFor='from'>From *</Form.Label>
            <Form.Control
              id='from'
              type='date'
              name='from'
              placeholder='eg: '
              required
              value={from}
              onChange={handleChange}
            />
          </Col>
          {!toDisabled && (
            <Col>
              <Form.Label htmlFor='to'>To</Form.Label>
              <Form.Control
                id='to'
                type='date'
                name='to'
                placeholder=' '
                value={to}
                onChange={handleChange}
              />
            </Col>
          )}
        </Row>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='description'>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          type='text'
          id='description'
          name='description'
          placeholder='Talk about your main tasks '
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      <Button className="form-submit" type='submit' value='Send data'>
        Save
      </Button>
    </Form>
  );
};

export default ExperienceForm;
