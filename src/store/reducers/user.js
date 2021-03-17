import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

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
    loading: false
  });
}

export const fetchUserFail = ( state, action ) => {
  return updateObject( state, {
    error: action.error,
    loading: false
  });
}

export const userCreate = ( state, action ) => {
  return updateObject( state, {
    clients: state.clients.concat(action.client),
  });
}

export const userEdit = ( state, action ) => {
  let clients = [...state.clients]
  let indexUser = clients.findIndex( user => user.id === action.data.id)
  clients[indexUser] = action.data
  return updateObject( state, {
    clients: clients
  });
}

export const userRemoved = ( state, action ) => {
  let clients = [...state.clients]
  let indexUser = clients.findIndex( user => user.id === action.removedId)
  clients.splice(indexUser, 1)
  return updateObject( state, {
    clients: clients
  } );
};

export const allUsers = ( state, action ) => {
  return updateObject( state, {
    clients: action.clients,
  });
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
      case actionTypes.USER_REMOVED: return userRemoved( state, action );
      case actionTypes.USER_EDIT: return userEdit( state, action );
      case actionTypes.USER_CREATE: return userCreate( state, action );
      case actionTypes.ALL_USERS: return allUsers( state, action );
      case actionTypes.FETCH_USER_START: return fetchUserStart( state, action );
      case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess( state, action );
      case actionTypes.FETCH_USER_FAIL: return fetchUserFail( state, action );
      default: return state;
  }
};

export default reducer;