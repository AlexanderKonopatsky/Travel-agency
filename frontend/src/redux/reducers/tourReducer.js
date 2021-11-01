import { TOUR_DETAILS_FAIL, TOUR_DETAILS_REQUEST, TOUR_DETAILS_SUCCESS, TOUR_LIST_FAIL, TOUR_LIST_REQUEST, TOUR_LIST_SUCCESS } from '../constants/tourConstants';

export const tourListReducer = (state = { loading: true, tours: []}, action) => {
  switch (action.type) {
    case TOUR_LIST_REQUEST:
      return { loading: true}
    case TOUR_LIST_SUCCESS:
      return { loading: false, tours: action.payload}
    case TOUR_LIST_FAIL:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}



export const tourDetailsReducer = ( state = { product: {}, loading: true}, action) => {
  switch (action.type) {
    case TOUR_DETAILS_REQUEST:
      return { loading: true }
    case TOUR_DETAILS_SUCCESS:
      return { loading: false, tour: action.payload }
    case TOUR_DETAILS_FAIL:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}