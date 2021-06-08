import {
  ADD_COMMENT,
  ADD_POST,
  CLEAR_POSTS,
  GET_POSTS,
  GET_USER_POST,
  POST_ERROR,
  TOGGLE_COMMENTS,
  UPDATE_LIKE,
} from '../actions/types';

const intialState = {
  posts: [],
  post: null,
  currentUserPosts: [],
  loading: true,
  error: {},
};

const postReducer = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        currentUserPosts: [payload, ...state.currentUserPosts],
        loading: false,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_USER_POST:
      return {
        ...state,
        currentUserPosts: payload,
        loading: false,
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: null,
        currentUserPosts: null,
      };

    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        currentUserPosts: state.currentUserPosts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? { ...post, comments: payload.comments }
            : post
        ),
        currentUserPosts: state.currentUserPosts.map((post) =>
          post._id === payload.postId
            ? { ...post, comments: payload.comments }
            : post
        ),
      };

    case TOGGLE_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload
            ? { ...post, toggleComments: !post.toggleComments }
            : post
        ),
        currentUserPosts: state.currentUserPosts.map((post) =>
          post._id === payload
            ? { ...post, toggleComments: !post.toggleComments }
            : post
        ),
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
