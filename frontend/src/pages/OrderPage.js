import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsOrder } from '../redux/actions/orderActions'
import '../components/Orders.css';








export default function OrderPage(props) {

  const orderId = props.match.params.id

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading2 } = orderDetails


  const dispatch = useDispatch()

  useEffect(() => {
    if (orderId) {
      dispatch(detailsOrder(orderId))
    }
  }, [orderId, dispatch])
  
return (
<div>
  {order ? ( 
  
  <>
  <div className="cartSection">
      <div className="cartContainer">
        <div className="grid-cart">
          <section className="grid-main-column-cart">
            <h1 className="head-text">Your order : {order._id}</h1>


            {order.orderItems.length === 0
              ? <MessageBox>Card is empty</MessageBox>
              :
              ( 
              <>
 <div className="item-cart">
   
                {order.orderItems.map(item => (
                   
                      <div key={item.tourId} className="item-cart-header">
                        <div>
                        <img className='item-order-image' src={item.image} alt='/'></img>
                        </div>
                        <div>
                          <h3 className="text">{item.title}</h3>
                          <h4 className="text">Start date: {item.startDate}</h4>
                          <h4 className="text">End date: {item.endDate}</h4>
                          <h4 className="text">Price: {item.price} $</h4>
                        </div>
                      </div>
          
                  ))
                }
          </div>
              </>
               
              )
            }

          </section>

          <section className="grid-checkout-column">
            <h1 className="head-text">Checkout Summary</h1>
            <div className="item-checkout">
              <div className="row-info">
                <div className="col-total">Total  {order.orderItems.reduce((a, c) => a + c.price, 0)} $</div> 

              </div>
              <div className="info-user">
                <h4 className="text">FirstName: {order.userInfo.firstName}</h4>
                <h4 className="text">LastName: {order.userInfo.firstName}</h4>
                <h4 className="text">Email: {order.userInfo.email}</h4>
              </div>
            </div>
          </section>

          <div className='section_message'>
            {loading2 && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
        </div>
      </div>
    </div>
    </>
  
  )  : 
   ( <LoadingBox></LoadingBox> )}

  </div>
)

}


