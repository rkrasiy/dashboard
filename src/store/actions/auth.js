import * as actionTypes from "./actionTypes"
import * as db from "../../db_config"
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
   /* axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPD9QmL-6q2JWOIsgTs0cyNZGZCUsoUMI",
    authData).then(response => {
      console.log(response)
      dispatch(authSuccess(response.data))
    }).catch(err => {
      console.log(err)
      dispatch(authFail())
    })*/

    fetch(db.URL + "/admin", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: authData,
    }).then(response => {
      console.log(response)
      dispatch(authSuccess(response.data))
    }).catch(err => {
      console.log(err)
      dispatch(authFail())
    })
      .catch((err) => console.log(err));
  };
}