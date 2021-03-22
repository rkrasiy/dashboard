import * as actionTypes from "./actionTypes"
import axios from "../../axios"

export const fetchProductStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START
  }
}
export const fetchProductSuccess = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
  }
}

export const fetchProductFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error: error
  }
}

export const allProducts = (data) => {
  return {
    type: actionTypes.ALL_PRODUCTS,
    products: data
  }
}
export const productCreate = (data) => {
  return {
    type: actionTypes.PRODUCT_CREATE,
    product: data
  }
}
export const productRemoved = (id) => {
  return {
    type: actionTypes.PRODUCT_REMOVED,
    removedId: id
  }
}
export const productEdit = (data) => {
  return {
    type: actionTypes.PRODUCT_EDIT,
    product: data
  }
}
export const fetchProductCreate = ( data , collection) => {
  return dispatch => {
    dispatch(fetchProductStart());
    axios.post("/" + collection, data)
      .then((response) => {
        dispatch(fetchProductSuccess());
        dispatch(productCreate(response.data));
      })
      .catch((err) => {
        dispatch(fetchProductFail(err))
      });
  }
};

export const fetchProductEdit = ( data , collection, id) => {
  return dispatch => {
    dispatch(fetchProductStart());
    axios.put("/" + collection + "/" + id, data)
      .then((response) => {
        dispatch(fetchProductSuccess());
        dispatch(productEdit(response.data));
      })
      .catch((err) => {
        dispatch(fetchProductFail(err))
      });
  }
};

export const fetchProductRemove = (collection, id) => {
  return dispatch => {
    dispatch(fetchProductStart());
    axios.delete("/" + collection + "/" + id)
      .then((response) => {
        dispatch(fetchProductSuccess());
        dispatch(productRemoved(id));
      })
      .catch((err) => {
        dispatch(fetchProductFail(err))
      });
  }
};

export const fetchAllProduct = (collection) => {
  return dispatch => {
    dispatch(fetchProductStart());
    axios.get("/" + collection)
      .then((response) => {
        dispatch(fetchProductSuccess());
        dispatch(allProducts(response.data));
      })
      .catch((err) => {
        dispatch(fetchProductFail(err))
      });
  }
}