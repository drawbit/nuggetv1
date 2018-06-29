const LOAD = 'redux-action/assesment/LOAD';
const LOAD_SUCCESS = 'redux-action/assesment/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-action/assesment/LOAD_FAIL';
const ASSESMENT_SAVE_SUCCESS = 'redux-action/assesment/ASSESMENT_SAVE_SUCCESS';
const ASSESMENT_SAVE_FAIL = 'redux-action/assesment/ASSESMENT_SAVE_FAIL';

const initialState = {
  saveError: null,
  saveSuccess: null,
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
        testDetails: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        testDetails: null,
        error: action.error
      };
    case ASSESMENT_SAVE_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        saveSuccess: (action.result || {}).error ? null : action.result
      };
    case ASSESMENT_SAVE_FAIL:
      return {
        ...state,
        saveError: (action.result || {}).error ? action.result : null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.assesments && globalState.assesments.loaded;
}

export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/gettest/${params.testid}`)
  };
}

export function saveTestInDB(data) {
  return {
    types: [ASSESMENT_SAVE_SUCCESS, ASSESMENT_SAVE_FAIL],
    promise: (client) => client.post('/createtest/new', {
      data
    })
  };
}
