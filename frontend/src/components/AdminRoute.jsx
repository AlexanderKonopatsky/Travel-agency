import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import MessageBox from "../components/MessageBox";
export default function AdminRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin  ? 
        (<Component {...props}></Component> ) : 
        ( <div className='error403'><MessageBox variant="danger">Ошибка 403. В доступе отказано.</MessageBox></div>   )
      }
    ></Route>
  );
}