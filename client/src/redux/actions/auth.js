import axios from 'axios';
import setTokenAuth from '../utils/setTokenAuth';
import { setAlert } from './alert';
import { clearPosts } from './post';
import { clearProfile, createAndUpdateProfile } from './profile';
import {
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from './types';

//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    setTokenAuth(localStorage.getItem('token'));
  } else {
    dispatch({ type: AUTH_ERROR });
  }
  try {
    const res = await axios.get('/api/auth');

    await dispatch({
      type: LOAD_USER,
      payload: {
        token: localStorage.getItem('token'),
        user: res.data,
      },
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//log in user
export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    const res = await axios.post('/api/auth', body, config);
    //save token in localStorage
    localStorage.setItem('token', res.data.token);
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    //load User
    await dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//register user
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    const res = await axios.post('/api/users', body, config);
    //save token in localStorage
    localStorage.setItem('token', res.data.token);
    await dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });

    //alert
    await dispatch(setAlert('User created', 'success'));

    //load User
    await dispatch(loadUser());

    //initial user Profile
    dispatch(createAndUpdateProfile({}));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
  localStorage.setItem('token', null);
  await dispatch({ type: LOGOUT });
  await dispatch(clearPosts());
  dispatch(clearProfile());
};
