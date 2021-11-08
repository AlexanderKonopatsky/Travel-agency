import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'
import { createOrder } from '../../redux/actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import MessageBox from '../MessageBox'
import '../cartPage.css'
import Footer from '../Footer'
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants'
import LoadingBox from '../LoadingBox'


export default function CartPage(props) {
  const tourId = props.match.params.id
  let startDate = props.location.search.split('=')[1]
  let endDate = props.location.search.split('=')[2]


  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, loading, error } = orderCreate

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const orderHandler = () => {
    if (!userInfo) {
      props.history.push('/login?redirect=cart')
    } else {
      dispatch(createOrder({ orderItems: cartItems}))
    }
  }


  useEffect(() => {
    if(tourId && !success) {
      dispatch(addToCart(tourId, startDate, endDate))
    }

    if(success) {
      props.history.push(`/orderHistory`)
      dispatch({ type: ORDER_CREATE_RESET})
    }
  }, [dispatch, tourId, startDate, endDate, success, order, props.history])

  
  return (
    <>
    <div className="cartSection">
      <div className="cartContainer">
        <div className="grid-cart">
          <section className="grid-main-column-cart">
            <h1 className="head-text">Your cart</h1>


            {cartItems.length === 0
              ? <MessageBox>Card is empty</MessageBox>
              :
              ( 
               <>
                {
                  cartItems.map(item => (
                    <div className="item-cart">
                    <div key={item.tourId} className="item-cart-header">
                      <div>
                      <img className='item-cart-image' src={item.image} alt='/'></img>
                      </div>
                      <div>
                        <h3 className="text">{item.title}</h3>
                        <h4 className="text">Start date: {item.startDate}</h4>
                        <h4 className="text">End date: {item.endDate}</h4>
                        <h4 className="text">Price: {item.price} $</h4>
                      </div>

    
                    </div>
                    <div className="item-bnt-remove"> 
                      <button type="button" className="btn-remove" onClick={() => removeFromCartHandler(item._id)}>Remove</button>
                    </div> 
{/*                     <div className="item-cart-table">
                      <thead>
                        <tr>
                          <td>Tour name</td>
                          <td>Quantity</td>
                          <td>Price</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="td-item-text">{item.title}</td>
                          <td class="td-item-quantity">{item.numReviews}</td>
                          <td class="td-item-price">{item.price}</td> 
                        </tr>
                      </tbody>
                    </div> */}
                    </div>
                  ))
                }
                  </>
               
              )
            }

          </section>

          <section className="grid-checkout-column">
            <h1 className="head-text">Checkout Summary</h1>
            <div className="item-checkout">
              <div className="row-info">
                <div className="col-total">Total  {cartItems.reduce((a, c) => a + c.price, 0)} $</div>
{/*                 <div className="col-price"></div> */}
              </div>
              <button onClick={orderHandler} type="submit" class="btn-checkout" disabled={cartItems.length === 0} >To order</button>
            </div>
          </section>

          <div className='section_message'>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}