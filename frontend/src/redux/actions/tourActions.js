import {TOUR_DETAILS_FAIL, TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_LIST_FAIL, TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS} from '../constants/tourConstants'
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