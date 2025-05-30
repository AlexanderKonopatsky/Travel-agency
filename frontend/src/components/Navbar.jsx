import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { signOut } from '../redux/actions/userActions'
import { listTourCategories } from '../redux/actions/tourActions'
import { Button } from './Button'
import SearchBar from './SearchBar'
import Sidebar from './Sidebar'
import { GoogleLogout } from 'react-google-login';
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

/*    const loginData = useSelector(state => state.loginData) */


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

   const countryHandler = () => {
      props.history.push('/countrylist')
   }

   const cityHandler = () => {
      props.history.push('/citylist')
   }

   const orderListHandler = () => {
      props.history.push('/orderListAdmin')
   }

   const userListHandler = () => {
      props.history.push('/userList')
   }

   const supportHandler = () => {
      props.history.push('/support')
   }

   const dashboardHandler = () => {
      props.history.push('/dashboard')
   }

   const logout = (response) => {

      dispatch(signOut())
   }
   return (

      <>
         <nav className='navbar'>


            <Sidebar />
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
                     Главная
                  </Link>
               </li>

               <li className='nav-item'>
                  <Link to='/advancedSearch' className='nav-links' onClick={closeMobileMenu}>
                     Расширенный поиск
                  </Link>
               </li>

               {/*           <li className='nav-item'>
            <Link to='/tour' className='nav-links' onClick={closeMobileMenu}>
              Tour
            </Link>
          </li> */}

               <li className='nav-item'>
                  <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>
                     Корзина
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
                                 <button onClick={profileHandler} className="ul-user">Профиль</button>
                              </li>
                              <li className="li-navbar">
                                 <button onClick={orderHistoryHandler} className="ul-user">История заказов</button>
                              </li>


                              {userInfo && userInfo.oauth !== 'gmail' &&
                                 <li className="li-navbar">
                                    <button onClick={signOutHandler} className="ul-user">Выход</button>
                                 </li>
                              }

                              {userInfo && userInfo.oauth === 'gmail' &&
                                 <li className="li-navbar">
                                    <GoogleLogout
                                       clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                                       onLogoutSuccess={signOutHandler}
                                       buttonText="Logout Gmail"
                                       render={renderProps => (
                                          <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='ul-user'>Logout Gmail</button>
                                       )}
                                    />
                                 </li>
                              }

                              {/*  <li className="li-navbar">
                                 <GoogleLogout
                                    clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                                    onLogoutSuccess={signOutHandler}
                                 />
                              </li> */}

                           </ul>
                        </li>

                     </div>
                  )
                     : (
                        <>
                           <li className='nav-item'>
                              <Button onClick={closeMobileMenu} text='Вход' link='/login' />
                           </li>
                           <li className='nav-item'>
                              <Button onClick={closeMobileMenu} text='Регистрация' link='/signUp' />
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
                              <button onClick={countryHandler} className="ul-user">Список стран</button>
                           </li>
                           <li className="li-navbar">
                              <button onClick={cityHandler} className="ul-user">Список городов</button>
                           </li>
                           <li className="li-navbar">
                              <button onClick={categoryHandler} className="ul-user">Список категорий</button>
                           </li>
                           <li className="li-navbar">
                              <button onClick={tourListHandler} className="ul-user">Список туров</button>
                           </li>
                           <li className="li-navbar">
                              <button onClick={orderListHandler} className="ul-user">Все заказы</button>
                           </li>
                           <li className="li-navbar">
                              <button onClick={userListHandler} className="ul-user">Пользователи</button>
                           </li>
                           <li className="li-navbar">
                              <button onClick={supportHandler} className="ul-user">Поддержка</button>
                           </li>
                           <li className="li-navbar">
                              <button onClick={dashboardHandler} className="ul-user">Панель администратора</button>
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