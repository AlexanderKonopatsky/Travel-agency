import {  ORDER_CREATE_FAIL,
          ORDER_CREATE_REQUEST,
          ORDER_CREATE_RESET,
          ORDER_CREATE_SUCCESS, 
          ORDER_DETAILS_FAIL, 
          ORDER_DETAILS_REQUEST,
          ORDER_DETAILS_SUCCESS,
          ORDER_LIST_REQUEST,
          ORDER_LIST_SUCCESS,
          ORDER_LIST_FAIL } from "../constants/orderConstants";

export const orderCreateReducer = ( state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_RESET: 
      return {}
    default:
      return state
  }
}

export const orderDeatalisReducer = ( state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading2: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading2: false, success: true, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading2: false, error: action.payload }
    default:
      return state
  }
}

export const orderListReducer = ( state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}