import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";
import productReducer from "./store/reducers/product";

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render( 
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
