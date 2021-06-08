import axios from 'axios';
import {
  ADD_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  GET_USER_POST,
  ADD_COMMENT,
  TOGGLE_COMMENTS,
  CLEAR_POSTS,
} from './types';

//Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'form-data',
      },
    };

    const res = await axios.post('/api/posts/', formData, config);

    dispatch({ type: ADD_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get current User Posts
export const getCurrentUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/users/${userId}`);
    dispatch({
      type: GET_USER_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//clear Posts
export const clearPosts = () => ({ type: CLEAR_POSTS });

//Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.post(`/api/posts/comment/${postId}`, body, config);

    dispatch({ type: ADD_COMMENT, payload: { postId, comments: res.data } });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Toggle comments
export const toggleCommentsForm = (postId) => ({
  type: TOGGLE_COMMENTS,
  payload: postId,
});
