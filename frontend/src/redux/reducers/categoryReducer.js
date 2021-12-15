import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
} from '../constants/categoryConstants'



export const tourCreateReducer = ( state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true }
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, tour: action.payload }
    case CATEGORY_CREATE_RESET:
      return { loading: false, error: action.payload}
    case CATEGORY_CREATE_FAIL: 
      return {}
    default:
      return state
  }
}




