import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { createEducation } from '../../redux/actions/profile';

const EducationForm = () => {
  const [toDisabled, setToDisabled] = useState(false);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    current: false,
    from: '',
    to: '',
    description: '',
  });

  const { school, degree, fieldofstudy, current, from, to, description } =
    formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createEducation(formData));

    //clear form
    setFormData({
      school: '',
      degree: '',
      fieldofstudy: '',
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
      id='education'
      onSubmit={handleSubmit}
    >
      <h3>Education</h3>
      <Form.Group>
        <Form.Label htmlFor='school'>School Name *</Form.Label>
        <Form.Control
          id='school'
          type='text'
          name='school'
          placeholder='eg: Helsinki Business College'
          required
          value={school}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='degree'>Degree *</Form.Label>
        <Form.Control
          id='degree'
          type='text'
          name='degree'
          placeholder='eg: '
          required
          value={degree}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='fieldofstudy'>Field of Study *</Form.Label>
        <Form.Control
          id='fieldofstudy'
          type='text'
          name='fieldofstudy'
          placeholder='eg: '
          required
          value={fieldofstudy}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type='checkbox'
          label='Currently Studying Here'
          name='current'
          checked={current}
          value={current}
          onChange={() => {
            setFormData({ ...formData, current: !current, to: '' });
            setToDisabled(!toDisabled);
          }}
        />
      </Form.Group>
      <Form.Group>
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
              <Form.Label htmlFor='to'>To (or expected)</Form.Label>
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
          placeholder='Talk about your study'
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      <Button className="form-submit" type='submit'>Save</Button>
    </Form>
  );
};

export default EducationForm;
