import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_PROFILE,
  CLEAR_PROFILE_BY_ID,
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  PROFILE_ERROR,
} from './types';

//get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get user profile by user id
export const getUserProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({ type: GET_PROFILE_BY_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//create or update profile
export const createAndUpdateProfile =
  (formData = {}, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);

      //fetch current user profile
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      //set alert
      dispatch(
        setAlert(edit ? 'Profile updated' : 'Profile created', 'success')
      );
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

//clear log-in user profile
export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

//clear user profile by id
export const clearUserProfileById = () => ({
  type: CLEAR_PROFILE_BY_ID,
});
