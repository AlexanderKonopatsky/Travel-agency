import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { listOrder } from "../redux/actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'
import { updateUserProfile } from "../redux/actions/userActions";
import '../components/Profile.css'
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import Axios from "axios"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { TOUR_UPDATE_RESET, TOUR_DETAILS_RESET } from "../redux/constants/tourConstants"

import { createCity } from "../redux/actions/cityActions";

function CityEditPage(props) {

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')
  const [image, setImage] = useState('')
  const [cityName, setCityName] = useState('')
  const [cityDesc, setCityDesc] = useState('')
  const [cityNameUpdate, setCityNameUpdate] = useState('')
  const [cityDescUpdate, setCityDescUpdate] = useState('')
  const [cityCountryUpdate, setCityCountryUpdate] = useState('')
  const [listCountry, setListCountry] = useState('')
  const [country, setCountry] = useState('')
  const [currentIdCity, setCurrentIdCity] = useState('')
  const [deletedCity, setDeletedCity] = useState([])
  const [categories, setCategories] = useState('')
  const userDetails = useSelector(state => state.userDetails)


  const getData = async () => {
   const listCountry = await Axios.get('/api/country/countryName')
   const arrCountry = listCountry.data.country.map(country => {
      return country.countryName
   })
   setListCountry(arrCountry)
}

  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  // CREATE
  const submitСategoryCreateHandler = (e) => {
    e.preventDefault();
    dispatch(createCity({
      cityName,
      cityDesc,
      cityImage: image, 
      country
    }))
    getDataCategory()
  }

  // UPDATE
  const submitСategoryUpdateHandler = async (city) => {


    const updatedCity = {
      cityName : cityNameUpdate,
      cityDesc : cityDescUpdate,
      cityImage: image,
      country:  country 
    }
    city.preventDefault();
    const { data } = await Axios.put(`/api/city/${currentIdCity}`, {updatedCity}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    getDataCategory()
  }

  const editCityHandler = (city) => {
   setCountry('')
   setCityNameUpdate(city.cityName)
   setCityDescUpdate(city.cityDesc)
   setCurrentIdCity(city._id)
   setCityCountryUpdate(city.country.countryName)
 }



  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const bodyFromData = new FormData()
    bodyFromData.append('image', file)
    setLoadingUpload(true)
    try {
      let { data } = await Axios.post('/api/uploads', bodyFromData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      if (data[0] !== '\\') {
        data = '\\' + data
      }
      setImage(data)
      setLoadingUpload(false)
    } catch (error) {
      setErrorUpload(error.message)
      setLoadingUpload(false)
    }
  }

  const deleteHandler = async (city) => {
    if (window.confirm('Are you sure to delete?')) {
      const { data } = await Axios.delete(`/api/city/${city._id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
      setDeletedCity(arr => [...deletedCity, city._id])
    }
  }



  const getDataCategory = async () => {
    const { data } = await Axios.get('/api/city', { headers: { Authorization: `Bearer ${userInfo.token}` } })
    setCategories(data.city)
  }

  

  const changeCountryHandler = (data) => {
   setCountry(data.value)
 }

  useEffect(() => {
    getDataCategory()
    getData()
  }, [])

  return (
    <>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  City page
                </h1>
              </div>
            </div>
          </div>

          <div className="grid-cart-category">
            <section className="grid-main-column-cart">
              <h1 className="head-text">Create city</h1>
              <div className="item-cart">

                <form className='form_for_new_user' onSubmit={submitСategoryCreateHandler}>
                  <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
{/*                     {errorUpdate && (
                      <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )} */}
{/*                     {categories && (
                      <MessageBox variant="success">
                        
                      </MessageBox>
                    )} */}
                    <div className='row1'>

                      <div className='form-box'>
                        <label className="form-box__field" >
                           <span className='form-label'>
                           The name of the city
                          </span>
                          <input className="form-input" value={cityName} onChange={e => setCityName(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           City Description   
                          </span>
                          <input className="form-input" value={cityDesc} onChange={e => setCityDesc(e.target.value)} type="text" />
                        </label>
                      </div>


{/*                       <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           Country   
                          </span>
                          <input className="form-input" value={cityDesc} onChange={e => setCityDesc(e.target.value)} type="text" />
                        </label>
                      </div> */}



                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           Country   
                          </span>
                          <div>
                                <Dropdown type="text" options={listCountry && listCountry}  onChange={changeCountryHandler} placeholder="Select an option" />
                              </div>
                        </label>
                      </div>



                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           City image
                          </span>
                          <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        Create
                      </button>
                    </div>

                  </>

                </form>

              </div>



              <h1 className="head-text">Update city</h1>
              <div className="item-cart">

                <form className='form_for_new_user' onSubmit={submitСategoryUpdateHandler}>
                  <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
     {/*                {errorUpdate && (
                      <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                      <MessageBox variant="success">
                        Profile Updated Successfully
                      </MessageBox>
                    )} */}
                    <div className='row1'>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Id city
                          </span>
                          <input className="form-input" value={currentIdCity} onChange={e => setCityNameUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Name city
                          </span>
                          <input className="form-input" type="hidden"  value={cityNameUpdate} onChange={e => setCityNameUpdate(e.target.value)}  type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           Country   
                          </span>
                          <div>
                                <Dropdown type="text" options={listCountry && listCountry} value={cityCountryUpdate} onChange={changeCountryHandler} placeholder="Select an option" />
                              </div>
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Description city
                          </span>
                          <input className="form-input" value={cityDescUpdate} onChange={e => setCityDescUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            City Image
                          </span>
                          <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        UPDATE
                      </button>
                    </div>

                  </>

                </form>

              </div>




            </section>

            <section className="grid-checkout-column">
              <h1 className="head-text">Сountry table</h1>
              <div className="item-cart">
                <table className="table">
                  <thead>     
                    <tr>
                      <th>cityName</th>
                      <th>cityDesc</th>
                      <th>cityImage</th>
                      <th>country</th>
                      <th>btn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories && categories.filter(row => !deletedCity.includes(row._id)).map(city => (
                      /*           {categories && categories.map(category => ( */
                        <tr key={city._id}>
                        <td>{city.cityName}</td>
                        <td>{city.cityDesc}</td>
                        <td>{city.cityImage}</td>
                        <td>{city.country.countryName}</td>

                        <td>
                          <button
                            type="button"
                            className="btn_details_admin"
                            onClick={() => editCityHandler(city)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn_details_admin"
                            onClick={() => deleteHandler(city)}
                          >
                            Delete
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </div>
      </div>

    </>
  )
}

export default CityEditPage