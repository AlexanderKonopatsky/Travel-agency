import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart = (tourId, startDate, endDate) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/tour/${tourId}`)

  const newStartDate = startDate.slice(0, startDate.indexOf(':') - 2)
  const newEndDate = endDate.slice(0, endDate.indexOf(':') - 2)
  console.log('startDate', startDate)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      tourId: data._id,
      src: data.src,
      text: data.text,
      image: data.image,
      desc: data.desc,
      price: data.price,
      addInfo: data.additionalInfo,
      startDate: newStartDate,
      endDate: newEndDate
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (tourId) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: tourId
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

