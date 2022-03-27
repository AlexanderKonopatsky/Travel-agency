import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const loginData = localStorage.getItem('loginData')
  const { userInfo } = userSignIn;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo || loginData ?
         ( <Component {...props}></Component> )   : 
         ( <Redirect to="/login" /> )
      }
    ></Route>
  );
}