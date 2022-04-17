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

import { createCountry } from "../redux/actions/countryActions";

function CountryEditPage(props) {

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')
  const [image, setImage] = useState('')
  const [countryName, setCountryName] = useState('')
  const [countryDesc, setCountryDesc] = useState('')
  const [countryNameUpdate, setCountryNameUpdate] = useState('')
  const [countryDescUpdate, setCountryDescUpdate] = useState('')

  const [currentIdCountry, setCurrentIdCountry] = useState('')

  const [deletedCountry, setDeletedCountry] = useState([])

  const [categories, setCategories] = useState('')
  const userDetails = useSelector(state => state.userDetails)



  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();



  /*   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateUserProfile({
        _id: user._id,
        firstName,
        lastName,
        email,
        image
      }))
    } */

  const submitСategoryCreateHandler = (e) => {
    e.preventDefault();
    dispatch(createCountry({
      countryName,
      countryDesc,
      countryImage: image
    }))
    getDataCategory()
  }

  const submitСategoryUpdateHandler = async (country) => {
    const updatedCountry = {
      countryName : countryNameUpdate,
      countryDesc : countryDescUpdate,
      countryImage: image
    }
    country.preventDefault();
    const { data } = await Axios.put(`/api/country/${currentIdCountry}`, {updatedCountry}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    getDataCategory()
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

  const deleteHandler = async (country) => {
    if (window.confirm('Are you sure to delete?')) {
      const { data } = await Axios.delete(`/api/country/${country._id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
      setDeletedCountry(arr => [...deletedCountry, country._id])
    }
  }

  const editCountryHandler = (country) => {
    setCountryNameUpdate(country.countryName)
    setCountryDescUpdate(country.countryDesc)
    setCurrentIdCountry(country._id)
  }

  const getDataCategory = async () => {
    const { data } = await Axios.get('/api/country', { headers: { Authorization: `Bearer ${userInfo.token}` } })
    setCategories(data.country)
  }

  useEffect(() => {
    getDataCategory()
  }, [])

  return (
    <>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  Страны
                </h1>
              </div>
            </div>
          </div>

          <div className="grid-cart-category">
            <section className="grid-main-column-cart">
              <h1 className="head-text">Добавить страну</h1>
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
                           Название
                          </span>
                          <input className="form-input" value={countryName} onChange={e => setCountryName(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           Описание
                          </span>
                          <input className="form-input" value={countryDesc} onChange={e => setCountryDesc(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           Изображение
                          </span>
                          <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        Добавить       
                      </button>
                    </div>

                  </>

                </form>

              </div>



              <h1 className="head-text">Обновить иформацию о стране  </h1>
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
                            Id страны
                          </span>
                          <input className="form-input" value={currentIdCountry} onChange={e => setCountryNameUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Название
                          </span>
                          <input className="form-input" type="hidden"  value={countryNameUpdate} onChange={e => setCountryNameUpdate(e.target.value)}  type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Описание
                          </span>
                          <input className="form-input" value={countryDescUpdate} onChange={e => setCountryDescUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Изображение
                          </span>
                          <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        Обновить
                      </button>
                    </div>

                  </>

                </form>

              </div>




            </section>

            <section className="grid-checkout-column">
              <h1 className="head-text">Таблица стран</h1>     
              <div className="item-cart">
                <table className="table">
                  <thead>     
                    <tr>
                      <th>Название</th>
                      <th>Описание</th>
                      <th>Изображение</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories && categories.filter(row => !deletedCountry.includes(row._id)).map(country => (
                      /*           {categories && categories.map(category => ( */
                        <tr key={country._id}>
                        <td>{country.countryName}</td>
                        <td>{country.countryDesc}</td>
                        <td>{country.countryImage}</td>

                        <td>
                          <button
                            type="button"
                            className="btn_details_admin"
                            onClick={() => editCountryHandler(country)}
                          >
                            Изменить      
                          </button>
                          <button
                            type="button"
                            className="btn_details_admin"
                            onClick={() => deleteHandler(country)}
                          >
                            Удалить
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

export default CountryEditPage