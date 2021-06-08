import {
  CLEAR_PROFILE,
  CLEAR_PROFILE_BY_ID,
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  PROFILE_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profileById: null,
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profileById: payload,
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    case CLEAR_PROFILE_BY_ID:
      return {
        ...state,
        profileById: null,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
