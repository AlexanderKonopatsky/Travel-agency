import {
  TOUR_DETAILS_FAIL,
  TOUR_DETAILS_REQUEST, 
  TOUR_DETAILS_SUCCESS, 
  TOUR_LIST_FAIL, 
  TOUR_LIST_REQUEST,
  TOUR_LIST_SUCCESS,
  TOUR_CREATE_FAIL,
  TOUR_CREATE_SUCCESS,
  TOUR_CREATE_REQUEST,
  TOUR_UPDATE_FAIL,
  TOUR_UPDATE_REQUEST,
  TOUR_UPDATE_SUCCESS,
  TOUR_DELETE_REQUEST,
  TOUR_DELETE_SUCCESS,
  TOUR_DELETE_FAIL,
  TOUR_SEARCH_FAIL,
  TOUR_SEARCH_REQUEST,
  TOUR_SEARCH_SUCCESS,
  TOUR_LIST_CATEGORY_FAIL,
  TOUR_LIST_CATEGORY_REQUEST,
  TOUR_LIST_CATEGORY_SUCCESS,
  TOUR_LIST_BY_CATEGORY_REQUEST,
  TOUR_LIST_BY_CATEGORY_FAIL,
  TOUR_LIST_BY_CATEGORY_SUCCESS
} from '../constants/tourConstants'
import Axios from 'axios'

export const listTour = () => async (dispatch) => {
  dispatch({
    type: TOUR_LIST_REQUEST
  })
  try {
    const { data } = await Axios.get('api/tours')
    dispatch({
      type: TOUR_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TOUR_LIST_FAIL,
      payload: error.message
    })
  }
}


export const detailsTour = (tourId) => async (dispatch) => {
  dispatch({
    type: TOUR_DETAILS_REQUEST,
    payload: tourId
  })
  try {
    const { data } = await Axios.get(`/api/tours/${tourId}`)
    dispatch({
      type: TOUR_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TOUR_DETAILS_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}

export const createTour = (tourId) => async (dispatch, getState) => {
  dispatch({
    type: TOUR_CREATE_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.post('/api/tours', {}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: TOUR_CREATE_SUCCESS,
      payload: data.tour
    })
  } catch (error) {
    dispatch({
      type: TOUR_CREATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}

export const updateTour = (tour) => async (dispatch, getState) => {
  dispatch({
    type: TOUR_UPDATE_REQUEST,
    payload: tour
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.put(`/api/tours/${tour._id}`, tour, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: TOUR_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TOUR_UPDATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const deleteTour = (tourId) => async (dispatch, getState) => {
  dispatch({
    type: TOUR_DELETE_REQUEST,
    payload: tourId
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.delete(`/api/tours/${tourId}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: TOUR_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TOUR_DELETE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const searchTours = (title) => async (dispatch, getState) => {
  dispatch({
    type: TOUR_SEARCH_REQUEST,
    payload: title
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.get(`/api/tours/search/${title}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: TOUR_SEARCH_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TOUR_SEARCH_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}

export const listTourCategories = () => async (dispatch) => {
  dispatch({
    type: TOUR_LIST_CATEGORY_REQUEST,
  })
  try {
    const { data } = await Axios.get(`/api/tours/categories/`)
    dispatch({
      type: TOUR_LIST_CATEGORY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TOUR_LIST_CATEGORY_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}




export const listTourByCategory = (category) => async (dispatch) => {
  dispatch({
    type: TOUR_LIST_BY_CATEGORY_REQUEST,
    payload: category
  })
  try {
    const { data } = await Axios.get(`/api/tours?category=${category}`)
    dispatch({
      type: TOUR_LIST_BY_CATEGORY_SUCCESS,
      payload: data
    })
    console.log(data, '***********')
  } catch (error) {
    dispatch({
      type: TOUR_LIST_BY_CATEGORY_FAIL,
      payload: error.message
    })
  } 
}