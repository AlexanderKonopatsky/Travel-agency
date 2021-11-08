import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart = (tourId, startDate, endDate) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/tours/${tourId}`)

  const newStartDate = startDate.slice(0, startDate.indexOf(':') - 2)
  const newEndDate = endDate.slice(0, endDate.indexOf(':') - 2)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data._id,
      image: data.image,
      title: data.title,
      category: data.category,
      desc: data.desc,
      price: data.price,
      additionalInfo: data.additionalInfo,
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

