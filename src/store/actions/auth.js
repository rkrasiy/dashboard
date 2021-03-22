import * as actionTypes from "./actionTypes"
import axios from "../../axios"

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
  localStorage.removeItem("userId");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
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
          const expirationTime = 3600;
          const expirationDate = new Date(new Date().getTime() + (expirationTime * 1000));
          const token = "#am1nj12d8sa8sdy12#&dfafasd";
          localStorage.setItem('userId', response.data[0].id);
          localStorage.setItem('user', response.data[0].user);
          localStorage.setItem('token', token);
          localStorage.setItem('expirationDate', expirationDate);
          dispatch(authSuccess(response.data[0].user, response.data[0].id, token))
          dispatch(checkAuthTimeout(expirationTime))
        }else{
          dispatch(authFail("El nombre de usuario o la contraseña son incorrectos"))
        }
      }).catch(err => {
        console.log(err.response)
        dispatch(authFail(err))
      })
  }
}

export const authCheckState  =  () => {
  return  dispatch => {
    const id = localStorage.getItem("userId");
    if(!id){
      dispatch(logout());
    }else{
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if(expirationDate <= new Date()){
        dispatch(logout())
      }else{
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token")
        const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000
        dispatch(authSuccess(user, id, token))
        dispatch(checkAuthTimeout(expirationTime))
      }
    }
  }
}