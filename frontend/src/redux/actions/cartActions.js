import Axios from "axios"
import { CART_ADD_ITEM } from "../constants/cartConstants"

export const addToCart = (tourId) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/tour/${tourId}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      tourId: data._id,
      text: data.text,
      image: data.image,
      desc: data.desc,
      price: data.price
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}