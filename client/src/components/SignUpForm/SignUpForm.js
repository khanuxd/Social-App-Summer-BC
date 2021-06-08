import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';
import { register } from '../../redux/actions/auth';

const SignUpForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(6, 'Password must be 6 characters or more')
          .required('Required'),
        confirmPassword: Yup.string()
          .min(6, 'Password must be 6 characters or more')
          .required('Required')
          .oneOf([Yup.ref('password')], 'Passwords must match'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(register(values));

        setSubmitting(false);
      }}
    >
      <Form className='sign-up-form'>
        <h3>Register Account!</h3>
        <small className='text-muted'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, eius.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, eius.
        </small>
        <FormGroup className='mt-5'>
          <FormLabel htmlFor='name'>Fullname*</FormLabel>
          <Field name='name' type='text' className='form-control' />
          <ErrorMessage component='div' className='error' name='name' />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='email'>Email address*</FormLabel>
          <Field name='email' type='email' className='form-control' />
          <ErrorMessage component='div' className='error' name='email' />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='password'>Password*</FormLabel>
          <Field name='password' type='password' className='form-control' />
          <ErrorMessage component='div' className='error' name='password' />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='confirmPassword'>Confirm Password*</FormLabel>
          <Field
            name='confirmPassword'
            type='password'
            className='form-control'
          />
          <ErrorMessage
            component='div'
            className='error'
            name='confirmPassword'
          />
        </FormGroup>
        <Button type='submit' variant='primary' className='d-block w-100'>
          Register
        </Button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
