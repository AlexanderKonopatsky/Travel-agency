import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsOrder } from '../redux/actions/orderActions'
import '../components/Orders.css';
import Axios from "axios"

export default function OrderPage(props) {

   const orderId = props.match.params.id

   const orderDetails = useSelector(state => state.orderDetails)
   const [orderMessage, setOrderMessage] = useState(false)
   const { order, error, loading2 } = orderDetails


   const dispatch = useDispatch()

   useEffect(() => {
      if (orderId) {
         dispatch(detailsOrder(orderId))
      }
   }, [orderId, dispatch])

   const getStringDate = (date) => {
      let newDate = new Date(date)
      console.log('new date', newDate)
      newDate = newDate.toString()
      return newDate.substr(0, 15)
   }

   const userSignIn = useSelector(state => state.userSignIn)
   const { userInfo } = userSignIn

   const submitDeleteOrder = async (availableSeats) => {
      const { data } = await Axios.delete(`/api/orders/${order._id}/${userInfo.email}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
      console.log('data', data)
      if (data.message === 'Order deleted') {
         setOrderMessage(true)
      }
   }

   return (
      <div>

         {order ? (

            <>
               <div className="cartSection">
                  <div className="cartContainer">
                     <div className="grid-cart">
                        <section className="grid-main-column-cart">
                           <h1 className="head-text">Ваш заказ : {order._id}</h1>


                           {order.orderItems.length === 0
                              ? <MessageBox>Корзина пуста</MessageBox>
                              :
                              (
                                 <>
                                    <div className="item-cart">

                                       {order.ordersInfo.map(item => (

                                          <div key={item._id} className="item-cart-header">
                                             <div>
                                                <img className='item-order-image' src={item._id.image} alt='/'></img>
                                                {console.log('112', new Date(item.startDate))}
                                             </div>
                                             <div>
                                                <h3 className="text">{item._id.title}</h3>
                                                <h4 className="text">Дата начала: {getStringDate(item.startDate)}</h4>
                                                <h4 className="text">Дата окончания: {getStringDate(item.endDate)}</h4>
                                                <h4 className="text">Количество дней: {item.numberOfDays}</h4>
                                                <h4 className="text">Количество человек: {item.numberOfPerson}</h4>
                                                <h4 className="text">Общая стоимость: {item.totalPrice} $</h4>
                   
                                             </div>
                                          </div>

                                       ))
                                       }

                                      {/*  {order.orderItems.map(item => (

                                          <div key={item.tourId} className="item-cart-header">
                                             <div>
                                                <img className='item-order-image' src={item.image} alt='/'></img>
                                                {console.log('111', item.image)}
                                             </div>
                                             <div>
                                                <h3 className="text">{item.title}</h3>
                                                <h4 className="text">Start date: {item.startDate}</h4>
                                                <h4 className="text">End date: {item.endDate}</h4>
                                                <h4 className="text">Price: {item.price} $</h4>
                                             </div>
                                          </div>

                                       ))
                                       } */}


                                    </div>
                                 </>

                              )
                           }

                        </section>

                        <section className="grid-checkout-column">
                           <h1 className="head-text">Данные пользователя</h1>
                           <div className="item-checkout">
                              <div className="row-info">
                                 <div className="col-total">Стоимость: {order.ordersInfo.reduce((a, c) => a + c.totalPrice, 0)}$</div>

                              </div>
                              <div className="info-user">
                                 <h4 className="text">Имя: {order.userInfo.firstName}</h4>
                                 <h4 className="text">Фамилия: {order.userInfo.firstName}</h4>
                                 <h4 className="text">Почта: {order.userInfo.email}</h4>
                              </div>
                           </div>
                           <button className="action-button-tour" type="button" onClick={(e) => submitDeleteOrder()}>Отменить заказ</button>
                  
                        </section>
                        {orderMessage && <MessageBox variant="success">Заказ отменён</MessageBox>}



                        <div className='section_message'>
                           {loading2 && <LoadingBox></LoadingBox>}
                           {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </div>
                     </div>
                  </div>
               </div>
            </>

         ) :
            ( error ?  <div className='loading'><MessageBox variant="danger">{error}</MessageBox></div>  : <div className='loading'><LoadingBox></LoadingBox></div>)}

      </div>
   )

}


