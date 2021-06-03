import { csrfFetch } from './csrf';

const initialState = { user: null };

const SET_SESSION = 'session/SET_SESSION';
const REMOVE_SESSION = 'session/REMOVE_SESSION';

const setSession = (user) => ({
  type: SET_SESSION,
  payload: user,
});

const removeSession = () => ({
  type: REMOVE_SESSION,
});

export const login = (userData) => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!data.errors) {
    dispatch(setSession(data.user));
  }
  return data;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  if (data.user) {
    dispatch(setSession(data.user));
  }
  return data;
};

export const signup = (userData) => async (dispatch) => {
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!data.errors) {
    dispatch(setSession(data.user));
  }
  return data;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(removeSession());
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.payload };
    case REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
