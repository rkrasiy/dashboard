import * as actionTypes from "./actionTypes"
import axios from "../../axios"

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  }
}
export const fetchUserSuccess = () => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
  }
}

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error
  }
}

export const allUsers = (data) => {
  return {
    type: actionTypes.ALL_USERS,
    clients: data
  }
}
export const userCreate = (data) => {
  return {
    type: actionTypes.USER_CREATE,
    client: data
  }
}
export const userRemoved = (id) => {
  return {
    type: actionTypes.USER_REMOVED,
    removedId: id
  }
}
export const userEdit = (data) => {
  return {
    type: actionTypes.USER_EDIT,
    data: data
  }
}
export const fetchUserCreate = ( data , collection) => {
  return dispatch => {
    dispatch(fetchUserStart());
    axios.post("/" + collection, data)
      .then((response) => {
        dispatch(fetchUserSuccess());
        dispatch(userCreate(response.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err))
      });
  }
};

export const fetchUserEdit = ( data , collection, id) => {
  return dispatch => {
    dispatch(fetchUserStart());
    axios.put("/" + collection + "/" + id, data)
      .then((response) => {
        dispatch(fetchUserSuccess());
        dispatch(userEdit(response.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err))
      });
  }
};

export const fetchUserRemove = (collection, id) => {
  return dispatch => {
    dispatch(fetchUserStart());
    axios.delete("/" + collection + "/" + id)
      .then((response) => {
        dispatch(fetchUserSuccess());
        dispatch(userRemoved(id));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err))
      });
  }
};

export const fetchAll = (collection) => {
  return dispatch => {
    dispatch(fetchUserStart());
    axios.get("/" + collection)
      .then((response) => {
        dispatch(fetchUserSuccess());
        dispatch(allUsers(response.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err))
      });
  }
}