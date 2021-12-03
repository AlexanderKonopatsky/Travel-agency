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
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
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

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST, 
    payload: user
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    console.log(`Bearer ${userInfo.token}`)
    const { data } = await Axios.put(`/api/users/profile2`, user, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const userList = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LIST_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.get(`/api/users`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const userEdit = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_EDIT_REQUEST,
    payload: user
  })
  const { userSignIn : { userInfo } } = getState() 
  console.log(`Bearer ${userInfo.token}`)
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: USER_EDIT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}

