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
  TOUR_COMMENT_CREATE_REQUEST,
  TOUR_COMMENT_CREATE_FAIL,
  TOUR_COMMENT_CREATE_SUCCESS,
  TOUR_LIST_CATEGORY_FAIL,
  TOUR_LIST_CATEGORY_REQUEST,
  TOUR_LIST_CATEGORY_SUCCESS,
  TOUR_LIST_BY_CATEGORY_REQUEST,
  TOUR_LIST_BY_CATEGORY_FAIL,
  TOUR_LIST_BY_CATEGORY_SUCCESS,
  TOUR_ADVANCED_SEARCH_REQUEST,
  TOUR_ADVANCED_SEARCH_FAIL,
  TOUR_ADVANCED_SEARCH_SUCCESS,
  TOUR_COMMENT_DELETE_FAIL,
  TOUR_COMMENT_DELETE_REQUEST,
  TOUR_COMMENT_DELETE_SUCCESS,
  TOUR_COMMENT_UPDATE_STATUS_REQUEST,
  TOUR_COMMENT_UPDATE_STATUS_SUCCESS,
  TOUR_COMMENT_UPDATE_STATUS_FAIL
} from '../constants/tourConstants'
import Axios from 'axios'

export const listTour = () => async (dispatch) => {
  dispatch({
    type: TOUR_LIST_REQUEST
  })
  try {
    const { data } = await Axios.get('api/tours/home')
    dispatch({
      type: TOUR_LIST_SUCCESS,
      payload: data.tours
    })
  } catch (error) {
    dispatch({
      type: TOUR_LIST_FAIL,
      payload: error.message
    })
  }
}


export const detailsTour = (tourId) => async (dispatch, getState) => {
  const { userSignIn : { userInfo } } = getState() 
  dispatch({
    type: TOUR_DETAILS_REQUEST,
    payload: tourId
  })
  try {
    if (userInfo) {
      const { data } = await Axios.get(`/api/tours/${tourId}?userId=${userInfo._id}`)
      dispatch({
         type: TOUR_DETAILS_SUCCESS,
         payload: data
       })
    } else {
      const { data } = await Axios.get(`/api/tours/${tourId}`)
      dispatch({
         type: TOUR_DETAILS_SUCCESS,
         payload: data
       })
    }
 
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
  try {
    const { data } = await Axios.get(`/api/tours/search/${title}`)
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





export const commentCreate = (tourId, comment) => async (dispatch, getState) => {
  dispatch({
    type: TOUR_COMMENT_CREATE_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.post(`/api/tours/${tourId}/comments`, comment, { headers: { 
      Authorization: `Bearer ${userInfo.token}`,
      oauth : userInfo.oauth, 
      userId : userInfo._id 
     } })
    dispatch({
      type: TOUR_COMMENT_CREATE_SUCCESS,
      payload: data.comments
    })
  } catch (error) {
    dispatch({  
      type: TOUR_COMMENT_CREATE_FAIL,
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






export const listTourByCategory = ({category = '', country = '', city = '', typeReq = '', pageNumber = ''}) => async (dispatch) => {
  dispatch({
    type: TOUR_LIST_BY_CATEGORY_REQUEST,
    payload: category
  })
  try {
    if (typeReq === 'category') {
      const { data } = await Axios.get(`/api/tours?category=${category}&page=${pageNumber}`)
      dispatch({
        type: TOUR_LIST_BY_CATEGORY_SUCCESS,
        payload: {tours : data.tours }
      })
    }
    if (typeReq === 'country') {

      const { data } = await Axios.get(`/api/tours?country=${country}&page=${pageNumber}`)
      dispatch({
        type: TOUR_LIST_BY_CATEGORY_SUCCESS,
        payload: {tours : data.tours, page : pageNumber, pages: data.pages }
      })
    }
    if (typeReq === 'city') {
      const { data } = await Axios.get(`/api/tours?city=${city}&page=${pageNumber}`)
      dispatch({
        type: TOUR_LIST_BY_CATEGORY_SUCCESS,
        payload: {tours : data.tours }
      })
    }
  } catch (error) {
    dispatch({
      type: TOUR_LIST_BY_CATEGORY_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const listTourAdvancedSearch = (obj) => async (dispatch) => {
  dispatch({
    type: TOUR_ADVANCED_SEARCH_REQUEST,
    payload: obj
  })
  try {
      const category = obj.category ? `category=${obj.category}&` : ''
      const city = obj.city ? `city=${obj.city}&` : ''
      const country = obj.country ? `country=${obj.country}&` : ''
      const priceFrom = obj.priceFro ? `priceFrom=${obj.priceFrom}&` : ''
      const priceTo = obj.priceTo ? `priceTo=${obj.priceTo}&` : ''
      const rating = obj.rating ? `rating=${obj.rating}&` : ''
      const { data } = await Axios.get(`/api/tours?${category}${city}${country}${priceFrom}${priceTo}${rating}`)
      dispatch({
        type: TOUR_ADVANCED_SEARCH_SUCCESS,
        payload: {tours : data.tours, page : obj.pageNumber, pages: data.pages }
      })

  } catch (error) {
    dispatch({
      type: TOUR_ADVANCED_SEARCH_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}

export const listTourAdvancedSearch2 = (obj) => async (dispatch) => {
   dispatch({
     type: TOUR_ADVANCED_SEARCH_REQUEST,
     payload: obj
   })
   try {
       const { data } = await Axios.post(`/api/tours/advancedSearchPage`, obj)
       dispatch({
         type: TOUR_ADVANCED_SEARCH_SUCCESS,
         payload: {tours : data.tours}
       })
 
   } catch (error) {
     dispatch({
       type: TOUR_ADVANCED_SEARCH_FAIL,
       payload: error.response && error.response.data.message 
         ? error.response.data.message
         : error.message
     })
   }
 }

 export const listTourAdvancedSearch3 = (obj) => async (dispatch) => {
   dispatch({
     type: TOUR_ADVANCED_SEARCH_REQUEST,
     payload: obj
   })
   try {
       const { data } = await Axios.post(`/api/tours/searchTours`, obj)
       dispatch({
         type: TOUR_ADVANCED_SEARCH_SUCCESS,
         payload: {tours : data.tours}
       })
 
   } catch (error) {
     dispatch({
       type: TOUR_ADVANCED_SEARCH_FAIL,
       payload: error.response && error.response.data.message 
         ? error.response.data.message
         : error.message
     })
   }
 }



export const commentUpdateStatus = (commentId, tourId, status) => async (dispatch, getState) => {
  dispatch({
    type: TOUR_COMMENT_UPDATE_STATUS_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.put(`/api/comments/${commentId}/tourId/${tourId}?status=${status}`, {}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: TOUR_COMMENT_UPDATE_STATUS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({  
      type: TOUR_COMMENT_UPDATE_STATUS_FAIL,
      payload: error.response && error.response.data.message 
      ? error.response.data.message
      : error.message
  })
  }
}


export const commentDelete = (commentId, tourId) => async (dispatch, getState) => {
  dispatch({
    type: TOUR_COMMENT_DELETE_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
    const { data } = await Axios.delete(`/api/comments/${commentId}/tourId/${tourId}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: TOUR_COMMENT_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({  
      type: TOUR_COMMENT_DELETE_FAIL,
      payload: error.response && error.response.data.message 
      ? error.response.data.message
      : error.message
  })
  }
}