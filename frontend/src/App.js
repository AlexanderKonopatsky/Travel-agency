import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import ContactUs from './components/pages/ContactUs'
import Products from './components/pages/Products'
import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp'
import Login from './components/pages/Login'
import Tour from './components/pages/Tour'
import CartPage from './components/pages/CartPage'



function App() {
  return (

      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/products" exact component={Products}/>
          <Route path="/contactUs" exact component={ContactUs}/>
          <Route path="/signUp" exact component={SignUp}/>
          <Route path="/tour/:id" component={Tour}/>
          <Route path="/cart/:id?" component={CartPage}/>
          <Route path="/login" exact component={Login}/>
        </Switch>
      </Router>

  )
}

export default App
