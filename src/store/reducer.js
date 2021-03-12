import * as actionTypes from "./actions";

const initialState = {
  clients: {
    name: "",
    last_name: "",
    email: "",
    phone_number: ""
  },
  formIsValid: false,
  personId: null
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case actionTypes.ADD_INGEDIENT:
      return {
        ...state,
        clientes: {
          ...state.clients,
          [action.clientsId]: state.clients[action.clientsId]
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        clientes: {
          ...state.clients,
          [action.clientsId]: state.clients[action.clientsId]
        }
      }
    default:
      return state;
  }
}
export default reducer