import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
} from '../constants/categoryConstants'
import Axios from 'axios'



export const createCategory = (category) => async (dispatch, getState) => {
  dispatch({
    type: CATEGORY_CREATE_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.post('/api/categories', {category}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}
