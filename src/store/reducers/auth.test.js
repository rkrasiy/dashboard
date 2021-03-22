import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", ()=>{
  it("should return the initial state",()=>{
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      userName: null,
      error: null,
      loading: false
    })
  })

  it("should store userId, name and token upon login",()=>{
    expect(reducer({
        token: null,
        userId: null,
        userName: null,
        error: null,
        loading: false
        },{
          type: actionTypes.AUTH_SUCCESS,
          idToken: "Token",
          userId: "ID",
          userName: "name"
          })).toEqual({
              token: "Token",
              userId: "ID",
              userName: "name",
              error: null,
              loading: false
            });
  })
  it("should clean token,userId and userName upon logout",()=>{
    expect(reducer({
        token: "token",
        userId: "id",
        userName: "name",
        error: null,
        loading: false
        },{
          type: actionTypes.AUTH_LOGOUT,
          idToken: null,
          userId: null,
          userName: null
          })).toEqual({
              token: null,
              userId: null,
              userName: null,
              error: null,
              loading: false
            });
  })

})