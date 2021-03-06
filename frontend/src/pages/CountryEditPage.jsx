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

  const submit–°ategoryCreateHandler = (e) => {
    e.preventDefault();
    dispatch(createCountry({
      countryName,
      countryDesc,
      countryImage: image
    }))
    getDataCategory()
  }

  const submit–°ategoryUpdateHandler = async (country) => {
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
                  –°—ā—Ä–į–Ĺ—č
                </h1>
              </div>
            </div>
          </div>

          <div className="grid-cart-category">
            <section className="grid-main-column-cart">
              <h1 className="head-text">–Ē–ĺ–Ī–į–≤–ł—ā—Ć —Ā—ā—Ä–į–Ĺ—É</h1>
              <div className="item-cart">

                <form className='form_for_new_user' onSubmit={submit–°ategoryCreateHandler}>
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
                           –Ě–į–∑–≤–į–Ĺ–ł–Ķ
                          </span>
                          <input className="form-input" value={countryName} onChange={e => setCountryName(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           –ě–Ņ–ł—Ā–į–Ĺ–ł–Ķ
                          </span>
                          <input className="form-input" value={countryDesc} onChange={e => setCountryDesc(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                           –ė–∑–ĺ–Ī—Ä–į–∂–Ķ–Ĺ–ł–Ķ
                          </span>
                          <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        –Ē–ĺ–Ī–į–≤–ł—ā—Ć       
                      </button>
                    </div>

                  </>

                </form>

              </div>



              <h1 className="head-text">–ě–Ī–Ĺ–ĺ–≤–ł—ā—Ć –ł—Ą–ĺ—Ä–ľ–į—Ü–ł—é –ĺ —Ā—ā—Ä–į–Ĺ–Ķ  </h1>
              <div className="item-cart">

                <form className='form_for_new_user' onSubmit={submit–°ategoryUpdateHandler}>
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
                            Id —Ā—ā—Ä–į–Ĺ—č
                          </span>
                          <input type="hidden" className="form-input" value={currentIdCountry}  type="text" />
                        </label> 
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            –Ě–į–∑–≤–į–Ĺ–ł–Ķ
                          </span>
                          <input className="form-input" type="hidden"  value={countryNameUpdate} onChange={e => setCountryNameUpdate(e.target.value)}  type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            –ě–Ņ–ł—Ā–į–Ĺ–ł–Ķ
                          </span>
                          <input className="form-input" value={countryDescUpdate} onChange={e => setCountryDescUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            –ė–∑–ĺ–Ī—Ä–į–∂–Ķ–Ĺ–ł–Ķ
                          </span>
                          <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        –ě–Ī–Ĺ–ĺ–≤–ł—ā—Ć
                      </button>
                    </div>

                  </>

                </form>

              </div>




            </section>

            <section className="grid-checkout-column">
              <h1 className="head-text">–Ę–į–Ī–Ľ–ł—Ü–į —Ā—ā—Ä–į–Ĺ</h1>     
              <div className="item-cart">
                <table className="table">
                  <thead>     
                    <tr>
                      <th>–Ě–į–∑–≤–į–Ĺ–ł–Ķ</th>
                      <th>–ě–Ņ–ł—Ā–į–Ĺ–ł–Ķ</th>
                      <th>–ė–∑–ĺ–Ī—Ä–į–∂–Ķ–Ĺ–ł–Ķ</th>
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
                            –ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć      
                          </button>
                          <button
                            type="button"
                            className="btn_details_admin"
                            onClick={() => deleteHandler(country)}
                          >
                            –£–ī–į–Ľ–ł—ā—Ć
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