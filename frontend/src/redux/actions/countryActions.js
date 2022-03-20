import {
  COUNTRY_CREATE_FAIL,
  COUNTRY_CREATE_REQUEST,
  COUNTRY_CREATE_RESET,
  COUNTRY_CREATE_SUCCESS,
} from '../constants/countryConstants'
import Axios from 'axios'



export const createCountry = (country) => async (dispatch, getState) => {
  dispatch({
    type: COUNTRY_CREATE_REQUEST
  })
  const { userSignIn : { userInfo } } = getState() 
  try {
     
    const { data } = await Axios.post('/api/country', {country}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    dispatch({
      type: COUNTRY_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COUNTRY_CREATE_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}
