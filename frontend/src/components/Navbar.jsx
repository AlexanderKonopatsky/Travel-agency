import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { signOut } from '../redux/actions/userActions'
import { listTourCategories } from '../redux/actions/tourActions'
import { Button } from './Button'
import SearchBar from './SearchBar'
import Sidebar from './Sidebar'
import './Navbar.css'


function Navbar(props) {


  const [click, setClick] = useState(false)
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn


  
  const dispatch = useDispatch()





  const signOutHandler = () => {
    dispatch(signOut())
  }

  const orderHistoryHandler = () => {
    props.history.push('/orderHistory/list')
  }

  const profileHandler = () => {
    props.history.push('/profile')
  }

  const tourListHandler = () => {
    props.history.push('/tourlist')
  }

  const categoryHandler = () => {
    props.history.push('/categorylist')
  }

  const orderListHandler = () => {
    props.history.push('/orderListAdmin')
  }

  const userListHandler = () => {
    props.history.push('/userList')
  }

  return (

    <>
      <nav className='navbar'>


        <Sidebar/>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Tour Agency
          <i className="fas fa-globe-americas icon" />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <SearchBar placeholder="Enter a tour title..." />
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/advancedSearch' className='nav-links' onClick={closeMobileMenu}>
            Advanced Search
            </Link>
          </li>

{/*           <li className='nav-item'>
            <Link to='/tour' className='nav-links' onClick={closeMobileMenu}>
              Tour
            </Link>
          </li> */}

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
                  <Button onClick={closeMobileMenu} text={userInfo.firstName} link='/login'></Button>
                  <i className="fa fa-caret-down"></i>
                  <ul className="dropdown-content">
                    <li className="li-navbar">
                      <button onClick={profileHandler} className="ul-user">Profile</button>
                    </li>
                    <li className="li-navbar">
                      <button onClick={orderHistoryHandler} className="ul-user">Order history</button>
                    </li>
                    <li className="li-navbar">
                      <button onClick={signOutHandler} className="ul-user">Logout</button>
                    </li>


                  </ul>
                </li>

              </div>
            )
              : (
                <>
                  <li className='nav-item'>
                    <Button onClick={closeMobileMenu} text='Log in' link='/login' />
                  </li>
                  <li className='nav-item'>
                    <Button onClick={closeMobileMenu} text='Sign up' link='/signUp' />
                  </li>
                </>
              )
          }

          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <li className='nav-item'>
                <Button onClick={closeMobileMenu} text='Admin' link='/login'></Button>
                <i className="fa fa-caret-down"></i>
                <ul className="dropdown-content-admin">
                  <li className="li-navbar">
                    <button onClick={categoryHandler} className="ul-user">Category list</button>
                  </li>
                  <li className="li-navbar">
                    <button onClick={tourListHandler} className="ul-user">Tour list</button>
                  </li>
                  <li className="li-navbar">
                    <button onClick={orderListHandler} className="ul-user">Orders</button>
                  </li>
                  <li className="li-navbar">
                    <button onClick={userListHandler} className="ul-user">Users</button>
                  </li>



                </ul>
              </li>

            </div>
          )}



        </ul>
      </nav>
    </>
  );
}

export default withRouter(Navbar)