import Axios from "axios"
import { 
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_FAIL, 
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT, 
  USER_SIGNUP_REQUEST, 
  USER_SIGNUP_SUCCESS, 
  USER_SIGNUP_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
} from "../constants/userConstants"

export const signIn = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password }
  })
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password })
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}

export const signUp = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { firstName, lastName, email, password }
  })
  try {
    const { data } = await Axios.post('/api/users/signUp', { firstName, lastName, email, password })
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}



export const signOut = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  dispatch({
    type: USER_SIGNOUT
  })
}


export const detailsUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}