import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../utility';

const initialState = {
  clients: [],
  error: null,
  loading: false
}

export const fetchUserStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
}

export const fetchUserSuccess = ( state, action ) => {
  return updateObject( state, {
    clients: state.clients.concat( action.clients ),
    loading: false
  });
}

export const fetchUserFail = ( state, action ) => {
  return updateObject( state, {
    error: action.error,
    loading: false
  });
}

const clearStore = (state, action) => {
  return updateObject( state, {
    clients: []
  });
}
export const userEdit = ( state, action ) => {
  let users = [...state.clients]
  let indexUser = users.findIndex( user => user.id === action.data.id)
  users[indexUser] = action.data
  return updateObject( state, {
    clients: users,
    loading: false
  });
}

export const userRemoved = ( state, action ) => {
  let users = [...state.clients]
  let indexUser = users.findIndex( user => user.id === action.removedId)
  users.splice(indexUser, 1)
  return updateObject( state, {
    clients: users,
    loading: false
  } );
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
      case actionTypes.USER_REMOVED: return userRemoved( state, action );
      case actionTypes.USER_EDIT: return userEdit( state, action );
      case actionTypes.USER_CLEAR_STORE: return clearStore( state, action );
      case actionTypes.FETCH_USER_START: return fetchUserStart( state, action );
      case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess( state, action );
      case actionTypes.FETCH_USER_FAIL: return fetchUserFail( state, action );
      default: return state;
  }
};

export default reducer;