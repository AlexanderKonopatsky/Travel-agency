import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button(props) {
  return (
    <Link to={props.link}>
      <button className='btn_auth_navbar'>{props.text}</button>
    </Link>
  );
}