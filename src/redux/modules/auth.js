const LOAD = 'redux-action/auth/LOAD';
const LOAD_SUCCESS = 'redux-action/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-action/auth/LOAD_FAIL';
const REGISTER = 'redux-action/auth/REGISTER';
const SIGNIN = 'redux-action/auth/SIGNIN';
const AFTER_REGISTER = 'redux-action/auth/AFTER_REGISTER';
const AFTER_SIGNIN = 'redux-action/auth/AFTER_SIGNIN';
const LOGOUT = 'redux-action/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-action/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-action/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: (action.result || {}).error ? null : action.result,
        error: (action.result || {}).error ? (action.result || {}).message : null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REGISTER:
      return {
        ...state,
        loggingIn: false,
        user: null,
        status: action.result
      };
    case SIGNIN:
      return {
        ...state,
        loggingIn: false,
        user: null,
        status: action.result
      };
    case AFTER_REGISTER:
      return {
        ...state,
        loggingIn: false,
        user: null,
        status: action.result
      };
    case AFTER_SIGNIN:
      return {
        ...state,
        loggingIn: false,
        user: (action.result || {}).error ? null : action.result,
        status: action.result
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/getAuth')
  };
}

export function register(data) {
  const {name, email, password, accounttype} = data;
  return {
    types: [REGISTER, AFTER_REGISTER],
    promise: (client) => client.post('/register', {
      data: {
        name,
        email,
        password,
        accounttype
      }
    })
  };
}

export function signin(data) {
  const {email, password} = data;
  return {
    types: [SIGNIN, AFTER_SIGNIN],
    promise: (client) => client.post('/signin', {
      data: {
        email,
        password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
