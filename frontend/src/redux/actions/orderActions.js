import {  ORDER_CREATE_FAIL,
          ORDER_CREATE_REQUEST,
          ORDER_CREATE_SUCCESS, 
          ORDER_DETAILS_REQUEST, 
          ORDER_DETAILS_SUCCESS,
          ORDER_DETAILS_FAIL, 
          ORDER_LIST_REQUEST, 
          ORDER_LIST_SUCCESS,
          ORDER_LIST_FAIL,
          ORDER_LIST_ADMIN_REQUEST, 
          ORDER_LIST_ADMIN_SUCCESS,
          ORDER_LIST_ADMIN_FAIL,
          ORDER_DELETE_FAIL,
          ORDER_DELETE_SUCCESS
} from "../constants/orderConstants"

import Axios from "axios"
import { CART_EMPTY } from "../constants/cartConstants"

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: order
  })
  try {
    const { userSignIn : { userInfo } } = getState() 
    const { data } = await Axios.post('/api/orders', order, { 
       headers: { 
            Authorization: `Bearer ${userInfo.token}`,
            oauth : userInfo.oauth, 
            userId : userInfo._id 
         } 
      })
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order
    })
    dispatch({
      type: CART_EMPTY
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
     
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: orderId
  }) 
  try {
    const { userSignIn : { userInfo } } = getState()
    const { data } = await Axios.get(`/api/orders/${orderId}`, {  headers: { 
         Authorization: `Bearer ${userInfo.token}`,
         oauth : userInfo.oauth, 
         userId : userInfo._id 
      } } )
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}



export const listOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_REQUEST
  })
  try {
    const { userSignIn : { userInfo } } = getState()
    const { data } = await Axios.get(`/api/orders/history/list`, { headers: { 
      Authorization: `Bearer ${userInfo.token}`,
      oauth : userInfo.oauth, 
      userId : userInfo._id 
     } } )
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    })
    
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}



export const listOrderAdmin = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_ADMIN_REQUEST
  })
  try {
    const { userSignIn : { userInfo } } = getState()
    const { data } = await Axios.get(`/api/orders`, { headers: { Authorization: `Bearer ${userInfo.token}` } } )
    dispatch({
      type: ORDER_LIST_ADMIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ADMIN_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: orderId
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.delete(`/api/orders/${orderId}/${userInfo.email}`, { headers: { 
      Authorization: `Bearer ${userInfo.token}`,
      oauth : userInfo.oauth, 
      userId : userInfo._id 
     } })
    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}



