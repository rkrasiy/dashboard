import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
  products: [],
  error: null,
  loading: false
}

export const fetchProductStart = ( state, action ) => {
  return updateObject( state, { loading: true } );
}

export const fetchProductSuccess = ( state, action ) => {
  return updateObject( state, {
    loading: false
  });
}

export const fetchProductFail = ( state, action ) => {
  return updateObject( state, {
    error: action.error,
    loading: false
  });
}

export const productCreate = ( state, action ) => {
  return updateObject( state, {
    products: state.products.concat(action.product),
  });
}

export const productEdit = ( state, action ) => {
  let products = [...state.products]
  let indexProduct = products.findIndex( product => product.id === action.product.id)
  products[indexProduct] = action.product
  return updateObject( state, {
    products: products
  });
}

export const productRemoved = ( state, action ) => {
  let products = [...state.products]
  let indexProduct = products.findIndex( product => product.id === action.removedId)
  products.splice(indexProduct, 1)
  return updateObject( state, {
    products: products
  } );
};

export const allProducts = ( state, action ) => {
  return updateObject( state, {
    products: action.products,
  });
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
      case actionTypes.PRODUCT_REMOVED: return productRemoved( state, action );
      case actionTypes.PRODUCT_EDIT: return productEdit( state, action );
      case actionTypes.PRODUCT_CREATE: return productCreate( state, action );
      case actionTypes.ALL_PRODUCTS: return allProducts( state, action );
      case actionTypes.FETCH_PRODUCT_START: return fetchProductStart( state, action );
      case actionTypes.FETCH_PRODUCT_SUCCESS: return fetchProductSuccess( state, action );
      case actionTypes.FETCH_PRODUCT_FAIL: return fetchProductFail( state, action );
      default: return state;
  }
};

export default reducer;