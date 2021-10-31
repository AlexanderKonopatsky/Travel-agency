import {TOUR_LIST_FAIL, TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS} from '../types'
import Axios from 'axios'

export const listTour = () => async (dispatch) => {
  dispatch({
    type: TOUR_LIST_REQUEST
  });
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