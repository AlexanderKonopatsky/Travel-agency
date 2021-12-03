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
  TOUR_CREATE_RESET,
  TOUR_UPDATE_FAIL,
  TOUR_UPDATE_REQUEST,
  TOUR_UPDATE_SUCCESS,
  TOUR_UPDATE_RESET,
  TOUR_DELETE_FAIL,
  TOUR_DELETE_SUCCESS,
  TOUR_DELETE_REQUEST,
  TOUR_DELETE_RESET
  } from '../constants/tourConstants';

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



export const tourDetailsReducer = ( state = { loading: true}, action) => {
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

export const tourCreateReducer = ( state = {}, action) => {
  switch (action.type) {
    case TOUR_CREATE_REQUEST:
      return { loading: true }
    case TOUR_CREATE_SUCCESS:
      return { loading: false, success: true, tour: action.payload }
    case TOUR_CREATE_FAIL:
      return { loading: false, error: action.payload}
    case TOUR_CREATE_RESET: 
      return {}
    default:
      return state
  }
}

export const tourUpdateReducer = ( state = {}, action) => {
  switch (action.type) {
    case TOUR_UPDATE_REQUEST:
      return { loading: true }
    case TOUR_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case TOUR_UPDATE_FAIL:
      return { loading: false, error: action.payload}
    case TOUR_UPDATE_RESET: 
      return {}
    default:
      return state
  }
}

export const tourDeleteReducer = ( state = {}, action) => {
  switch (action.type) {
    case TOUR_DELETE_REQUEST:
      return { loading: true }
    case TOUR_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TOUR_DELETE_FAIL:
      return { loading: false, error: action.payload}
    case TOUR_DELETE_RESET: 
      return {}
    default:
      return state
  }
}





