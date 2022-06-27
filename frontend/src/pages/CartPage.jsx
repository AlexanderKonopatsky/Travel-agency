import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import { createOrder } from '../redux/actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import MessageBox from "../components/MessageBox";
import '../components/cartPage.css'
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants'
import LoadingBox from '../components/LoadingBox'



export default function CartPage(props) {
  const tourId = props.match.params.id
  let idSeats = props.location.search.split('=')[1]
  let startDate = props.location.search.split('=')[2]
  let endDate = props.location.search.split('=')[3]
  let numberOfPerson = props.location.search.split('=')[4]

console.log('///', props.location.search.split('=')[1])
console.log('///', props.location.search.split('=')[2])
console.log('///', props.location.search.split('=')[3])
console.log('///', props.location.search.split('=')[4])
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
      dispatch(createOrder({ orderItems: cartItems }))
    }
  }


  useEffect(() => {
    if (tourId && !success) {
      dispatch(addToCart(tourId, startDate, endDate, numberOfPerson, idSeats))
    }

    if (success) {
      /*       props.history.push(`/order/${order._id}`)  */
      props.history.push(`/order/${order._id}`)
       dispatch({ type: ORDER_CREATE_RESET}) 
    }
  }, [dispatch, tourId, startDate, endDate, success, order, props.history, idSeats])


  return (
    <>
      <div className="cartSection">
        <div className="cartContainer">
          <div className="grid-cart">
            <section className="grid-main-column-cart">
              <h1 className="head-text">Корзина </h1>


              {cartItems.length === 0
                ? <MessageBox>Корзина пуста</MessageBox>
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
                              <h4 className="text">Дата начала: {item.startDate}</h4>
                              <h4 className="text">Дата окончания: {item.endDate}</h4>
                              <h4 className="text">Количество человек: {item.numberOfPerson}</h4>
                              <h4 className="text">Количество дней: {item.numberOfDays}</h4>
                              <h4 className="text">Цена за день: {item.price} $</h4>
                              <h4 className="text">Общая стоимость {item.price}$ * {item.numberOfDays} * {item.numberOfPerson} = {item.totalPrice} $</h4>
                            </div>


                          </div>
                          <div className="item-bnt-remove">
                            <button type="button" className="btn-remove" onClick={() => removeFromCartHandler(item._id)}>Удалить</button>
                          </div>
                        </div>
                      ))
                    }
                  </>

                )
              }

            </section>

            <section className="grid-checkout-column">
              <h1 className="head-text">Общая сумма заказа  </h1>
              <div className="item-checkout">
                <div className="row-info">
                  <div className="col-total">Всего  {cartItems.reduce((a, c) => a + c.totalPrice, 0)} $</div>
                </div>
                <button onClick={orderHandler} type="submit" class="btn-checkout" disabled={cartItems.length === 0} >Заказать</button>
              </div>
              {console.log(userInfo)}
              {!userInfo && <MessageBox variant="success">Для бронирования пожалуйства авторизуйтесь</MessageBox>}
            </section>

            <div className='section_message'>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}