import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsTour, updateTour } from "../redux/actions/tourActions";
import { TOUR_UPDATE_RESET, TOUR_DETAILS_RESET } from "../redux/constants/tourConstants"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from "axios"


function TourEditPage(props) {
  const tourId = props.match.params.id
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [label, setLabel] = useState('')
  const [desc, setDesc] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [listCity, setListCity] = useState('')
  const [city, setCity] = useState('')
  const [listCountry, setListCountry] = useState('')
  const [listCategory, setListCategory] = useState('')
  const [country, setCountry] = useState('')
  const [uploadedImage, setUploadedImage] = useState([])

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')

  const [loadingUploadGallery, setLoadingUploadGallery] = useState(false)
  const [errorUploadGallery, setErrorUploadGallery] = useState('')

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const dispatch = useDispatch()

  const tourUpdate = useSelector(state => state.tourUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = tourUpdate

  const tourDetails = useSelector(state => state.tourDetails)
  const { loading: loadingDetails, error: errorDetails, tour } = tourDetails

  const changeCityHandler = (data) => {
    setCity(data.value)
  }

  const changeCountryHandler = async (data) => {
    setCountry(data.value)
    const listCityUpdate = await Axios.get(`/api/tours/cityInTheCountry?country=${data.value}`)
    setListCity(listCityUpdate.data)
  }

    const changeCategoryHandler = async (data) => {
      setCategory(data.value)
  }




  const uploadFileHandlerGallery = async (e) => {
    const file = e.target.files[0]
    const bodyFromData = new FormData()
    bodyFromData.append('image', file)
    setLoadingUploadGallery(true)
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
      setUploadedImage(arr => [...uploadedImage, data])
      setLoadingUploadGallery(false)
    } catch (error) {
      setErrorUploadGallery(error.message)
      setLoadingUploadGallery(false)
    }
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



  const backHandler = () => {
    props.history.push('/tourlist')
  }

  const getData = async () => {
 /*    const listCity = await Axios.get('/api/tours/city')
    setListCity(listCity.data.sort())
    const listCountry = await Axios.get('/api/tours/country')
    setListCountry(listCountry.data.sort()) */

    const listCity2 = await Axios.get('/api/city/cityName')
    const arrCity = listCity2.data.city.map(city => {
      return city.cityName
    })
    setListCity(arrCity)


    const listCountry2 = await Axios.get('/api/country/countryName')
    console.log('listCountry2', listCountry2)
    const arrCountry = listCountry2.data.country.map(country => {
      return country.countryName
    })
    setListCountry(arrCountry)


    const listCategory = await Axios.get('/api/categories/categoryName')
    const arrCategory = listCategory.data.categories.map(category => {
      return category.categoryName
    })
    setListCategory(arrCategory)
  }


  const submitHandler = async (e) => {
    e.preventDefault();
  

    await dispatch(
      updateTour({
        _id: tourId,
        title, price, image, category, label, desc, additionalInfo, country, city, uploadedImage
      })
    )
    console.log('image', image, category)
    dispatch({ type: TOUR_DETAILS_RESET })
  }



  useEffect(() => {
    getData()
    dispatch({ type: TOUR_UPDATE_RESET })
  }, [dispatch])

  useEffect(() => {
    if (success) {
      /*       props.history.push('/tourlist') */
    /*   dispatch({ type: TOUR_UPDATE_RESET }) */
    }
    if (!tour || tour._id !== tourId) {
     /*  dispatch({ type: TOUR_UPDATE_RESET }) */
      dispatch(detailsTour(tourId))
    } else if (tour) {
      setTitle(tour.title)
      setPrice(tour.price)
      setImage(tour.image)
      setCategory(tour.category)
      setLabel(tour.label)
      setDesc(tour.desc)
      setAdditionalInfo(tour.additionalInfo)
      setCountry(tour.country)
      setCity(tour.city)
    }
  }, [dispatch, props.history, success, tour, tourId])

  return (
    <div>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  Edit Tour
                </h1>

              </div>
            </div>
          </div>

          <section className="grid-main-column-tour">
            <h1 className="head-text">Edit form</h1>
            <div className="item-tour">

              <form className='form_for_new_user' onSubmit={submitHandler}>


                <>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
                  {errorUpdate && (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                  )}

                  <div className='row'>
                    {loadingDetails &&
                      <LoadingBox></LoadingBox>
                    }

                    {errorDetails ?
                      <MessageBox variant="danger">{errorDetails}</MessageBox> :
                      (
                        <>
                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Title
                              </span>
                              <input required className="form-input" value={title} onChange={e => setTitle(e.target.value)} type="text" />
                            </label>
                          </div>

                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Price
                              </span>
                              <input className="form-input" value={price} onChange={e => setPrice(e.target.value)} type="text" />
                            </label>
                          </div>

                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Main Image
                              </span>
                              <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                              {loadingUpload && <LoadingBox></LoadingBox>}
                              {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>
                              )}
                            </label>
                          </div>


                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Image gallery
                              </span>
                              <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandlerGallery} />
                              {loadingUploadGallery && <LoadingBox></LoadingBox>}
                              {errorUploadGallery && (
                                <MessageBox variant="danger">{errorUploadGallery}</MessageBox>
                              )}
                            </label>
                            <span className='form-label'>
                     
                              </span>
                              <ul>
                                {uploadedImage && uploadedImage.map(image => (
                                  <li>{image}</li>
                                ))}
                              </ul>
                          </div>

                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Category
                              </span>
                              <div>
                                <Dropdown type="text" options={listCategory && listCategory} value={category } onChange={changeCategoryHandler} placeholder="Select an option" />
                              </div>
                            </label>
                          </div>

{/*                           <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Category
                              </span>
                              <input className="form-input" value={category} type="text" onChange={e => setCategory(e.target.value)} />
                            </label>
                          </div>
 */}
{/*                           <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Label
                              </span>
                              <input className="form-input" value={label} type="text" onChange={e => setLabel(e.target.value)} />
                            </label>
                          </div> */}



                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Select a country
                              </span>
                              
                              <div>
                                <Dropdown type="text" options={listCountry && listCountry} value={tour && tour.country} onChange={changeCountryHandler} placeholder="Select an option" />
                              </div>

                            </label>
                          </div>

{/*                           <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Select a city
                              </span>
                              
                              <div>
                                <Dropdown type="text" options={listCity && listCity} value={tour && tour.city} onChange={changeCityHandler} placeholder="Select an option" />
                              </div>

                            </label>
                          </div> */}

{/*                       <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Country
                              </span>
                              <input className="form-input" value={country} type="text" onChange={e => setCountry(e.target.value)} />
                            </label>
                          </div> */}

                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Select a city
                              </span>
                              <Dropdown type="text" options={listCity && listCity} value={listCity ? listCity[0] : (tour && tour.city)} onChange={changeCityHandler} placeholder="Select an option" />
                            </label>
                          </div>

{/*                           <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                City
                              </span>
                              <input autofocus="autofocus" className="form-input" value={city} type="text" onChange={e => setCity(e.target.value)} />
                            </label>
                          </div> */}

                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                Description
                              </span>
                              <input className="form-input" value={desc} type="text" onChange={e => setDesc(e.target.value)} />
                            </label>
                          </div>

                          <div className='form-box'>
                            <label className="form-box__field" >
                              <span className='form-label'>
                                additionalInfo
                              </span>
                              <textarea className="form-input-textarea" value={additionalInfo} type="text" onChange={e => setAdditionalInfo(e.target.value)} ></textarea>
                            </label>
                          </div>
                          {success && (
                            <MessageBox variant="success">
                              Tour Updated Successfully
                            </MessageBox>
                          )}
                          <button className='btn_auth' type="submit" >
                            UPDATE
                          </button>
                          <button className='btn_auth' type="submit" onClick={backHandler} >
                            RETURN TO THE LIST OF TOURS
                          </button>

                        <button className='btn_auth' type="submit" onClick={backHandler} >
                            RETURN TO THE LIST OF TOURS
                        </button>




                        </>)
                    }

                  </div>
                </>

              </form>

            </div>


          </section>




        </div>
      </div>






    </div>
  )
}

export default TourEditPage