import * as actionTypes from "./actionTypes"
import axios from "../../server"

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  }
}
export const fetchUserSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    clients: data
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

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error
  }
}
export const clearStore = () => {
  return {
    type: actionTypes.USER_CLEAR_STORE
  }
}

export const fetchUserCreate = ( data , collection) => {
  return dispatch => {
    dispatch(fetchUserStart());
    axios.post("/" + collection, data)
      .then((response) => {
        dispatch(fetchUserSuccess(response.data));
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
        dispatch(fetchUserSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err))
      });
  }
}