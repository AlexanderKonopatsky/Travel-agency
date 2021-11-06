import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { signOut } from '../redux/actions/userActions'
import {Button} from './Button'
import './Navbar.css'


function Navbar() {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const dispatch = useDispatch()

  const signOutHandler = () => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    dispatch(signOut())
  }

  return (
    
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Tour Agency  
          <i className="fas fa-globe-americas icon"/>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/contactUs' className='nav-links' onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
              Products
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/tour' className='nav-links' onClick={closeMobileMenu}>
              Tour
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>
              Cart
              {
                cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)
              }
            </Link>
          </li>
          {
            userInfo ? (
              <div className="dropdown">
                <li className='nav-item'>
                 <Button onClick={closeMobileMenu} text={userInfo.firstName} link='login'></Button>
                 <i className="fa fa-caret-down"></i>
                 <ul className="dropdown-content">
                  <button onClick={signOutHandler} className="ul-user">Sign Out</button>
                </ul>
                </li> 

              </div>
               ) 
            : (
              <li className='nav-item'>
              <Button onClick={closeMobileMenu} text='Log in' link='login'/>
              </li> )
          }

          <li className='nav-item'>
            <Button onClick={closeMobileMenu} text='Sign up' link='signUp'/>
          </li>
         
        </ul>
      </nav>
    </>
  );
}

export default Navbar