import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'



const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null
  },
  cart: {
    cartItems: localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  }, 
  loginData: localStorage.getItem('loginData')
   ? JSON.parse(localStorage.getItem('loginData')) 
   : null
}

const store = createStore(rootReducer, initialState, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* reportWebVitals(); */
