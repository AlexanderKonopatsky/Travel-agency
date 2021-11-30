import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
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
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import TourListPage from './pages/TourListPage'

function App() {
  return (

      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/products/:id" exact component={Products}/>
          <Route path="/contactUs" exact component={ContactUs}/>
          <Route path="/signUp" exact component={SignUp}/>
          <Route path="/tour/:id" component={Tour}/>
          <Route path="/cart/:id?" component={CartPage}/>
          <Route path="/order/:id" component={OrderPage}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/orderHistory/list" exact component={OrderHistoryPage}/>
          <PrivateRoute path='/profile' component={Profile}></PrivateRoute>
          <AdminRoute path="/tourlist" component={TourListPage}></AdminRoute>
        </Switch>
        <Footer></Footer>
      </Router>

  )
}

export default App
