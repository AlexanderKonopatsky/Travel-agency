import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import error404 from './components/error404'
import ContactUs from './pages/ContactUs'
import Products from './pages/Products'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import OrderHistoryPage from './pages/OrderHistoryPage'
import Tour from './pages/Tour'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import Footer from './components/Footer'
import Profile from './pages/ProfilePage'
import CategoryEditPage from './pages/CategoryEditPage'
import CountryEditPage from './pages/CountryEditPage'
import CityEditPage from './pages/CityEditPage'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import TourListPage from './pages/TourListPage'
import TourEditPage from './pages/TourEditPage'
import OrderListAdminPage from './pages/orderListAdminPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import SearchPage from './pages/SearchPage'
import TourCategoryPage from './pages/TourCategoryPage'
import AdvancedSearch from './pages/AdvancedSearch'
import TourAdvanceSearchPage from './pages/TourAdvanceSearchPage'
import SupportPage from './pages/SupportPage'
import DashboardPage from './pages/DashboardPage'
import ResetPassword from './pages/ResetPassword'
import SearchByFormPage from './pages/SearchByFormPage'
import ChatBox from './components/ChatBox'

function App() {
   const userSignIn = useSelector(state => state.userSignIn)
   const { userInfo } = userSignIn

  return (
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/products/:id" exact component={Products}/>
          <Route path="/search/:title" component={SearchPage}/>
          <Route path="/contactUs" exact component={ContactUs}/>
          <Route path="/signUp" exact component={SignUp}/>
          <Route path="/tour/:id" component={Tour} exact/>
          <Route path="/cart/:id?" component={CartPage}/>
          <Route path="/order/:id" component={OrderPage}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/tour/:id/edit" exact component={TourEditPage}/>
          <Route path="/orderHistory/list" exact component={OrderHistoryPage}/>
          <Route path="/resetPassword/:userId/:uniqueString" exact component={ResetPassword}/>
          <PrivateRoute path='/profile' component={Profile}></PrivateRoute>
          <PrivateRoute path='/categorylist' component={CategoryEditPage}></PrivateRoute>
          <PrivateRoute path='/countrylist' component={CountryEditPage}></PrivateRoute>
          <PrivateRoute path='/citylist' component={CityEditPage}></PrivateRoute>
          <AdminRoute path="/tourlist" component={TourListPage}></AdminRoute>
          <AdminRoute path="/orderListAdmin" component={OrderListAdminPage}></AdminRoute>
          <AdminRoute path="/userList" component={UserListPage}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditPage}></AdminRoute>
          <AdminRoute path="/support" component={SupportPage}></AdminRoute>
          <AdminRoute path="/dashboard" component={DashboardPage}></AdminRoute>
          <Route path="/orderHistory/list" exact component={OrderHistoryPage}/>
          <Route path="/category/:category" exact component={TourCategoryPage}/> 
          <Route path="/city/:city" exact component={TourCategoryPage}/> 
          <Route path="/country/:country" exact component={TourCategoryPage}/> 
          <Route path="/searchByForm" exact component={SearchByFormPage}/> 
          <Route path="/advancedSearch" exact component={AdvancedSearch}/> 
          <Route path="/advancedSearchPage" exact component={TourAdvanceSearchPage}/> 
          <Route exact component={error404} />
        </Switch>
        <Footer></Footer>
      </Router>
  )
}

export default App
