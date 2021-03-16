import * as actionTypes from "./actionTypes"
import axios from "../../server"

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (name, userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userName: name,
    idToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeout = (expirationTime) =>{
  return dispatch => {
    setTimeout(()=>{
      dispatch(logout())
    },expirationTime * 1000)
  }
}
export const auth = (name, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let url = `/admin?user=${name}&password=${password}`
    axios.get(url)
      .then(response => {
        if(response.data && response.data.length > 0){
          dispatch(authSuccess(response.data[0].user, response.data[0].id, "token"))
          dispatch(checkAuthTimeout(3600))
        }else{
          dispatch(authFail("El nombre de usuario o la contraseña son incorrectos"))
        }
      }).catch(err => {
        console.log(err.response)
        dispatch(authFail(err))
      })
  }
}