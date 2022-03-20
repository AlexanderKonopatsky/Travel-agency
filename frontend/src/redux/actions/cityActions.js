import {
  CITY_CREATE_FAIL,
  CITY_CREATE_REQUEST,
  CITY_CREATE_RESET,
  CITY_CREATE_SUCCESS,
} from '../constants/cityConstants'
import Axios from 'axios'



export const createCity = (city) => async (dispatch, getState) => {
  dispatch({
    type: CITY_CREATE_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
     
    const { data } = await Axios.post('/api/city', {city}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: CITY_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CITY_CREATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}
