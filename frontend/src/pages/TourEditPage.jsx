import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsTour, updateTour } from "../redux/actions/tourActions";
import { TOUR_UPDATE_RESET, TOUR_DETAILS_RESET } from "../redux/constants/tourConstants"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { YMaps, Map, Placemark} from 'react-yandex-maps';
import Axios from "axios"


function TourEditPage(props) {
   const tourId = props.match.params.id
   const [title, setTitle] = useState('')
   const [price, setPrice] = useState('')
   const [image, setImage] = useState('')
   const [imageAttraction, setImageAttraction] = useState('')
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
   const [coordinates, setCoordinates] = useState('')
   const [cityName, setCityName] = useState('')
   const [deletedAttraction, setDeletedAttraction] = useState([])
   
   const [dataAttraction, setDataAttraction] = useState('')
   const [adressAttraction, setAdressAttraction] = useState('')
   const [descAttraction, setDescAttraction] = useState('')
   const [titleAttraction, setTitleAttraction] = useState('')
   const [attractionId, setAttractionId] = useState('')

   const [loadingUpload, setLoadingUpload] = useState(false)
   const [errorUpload, setErrorUpload] = useState('')

   const [loadingUploadGallery, setLoadingUploadGallery] = useState(false)
   const [errorUploadGallery, setErrorUploadGallery] = useState('')

   const [loadingUploadAttraction, setLoadingUploadAttraction] = useState(false)
   const [errorUploadAttraction, setErrorUploadAttraction] = useState('')

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

   const deleteHandler = async (attraction) => {
      if (window.confirm('Are you sure to delete?')) {
         const { data } = await Axios.delete(`/api/attraction/${tourId}/${attraction._id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
         setDeletedAttraction(arr => [...deletedAttraction, attraction._id]) 
      }
   }

   const changeCategoryHandler = async (data) => {
      setCategory(data.value)
   }

   const divStyle = {
      overflow: 'hidden'
   };

   const divStyle2 = {
      'margin-top': '10px'
   };

   const getCoordinate = async () => {
      if (adressAttraction) {
         let getCoordinate = await Axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_API_KEY_YANDEX_MAPS}&format=json&geocode=${adressAttraction}&results=1`)
         getCoordinate = getCoordinate.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
         let splits = getCoordinate.split(' ')
         setCoordinates(splits)
      } else {
         setCoordinates(['-', '-'])
      }

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

   const uploadFileHandler2 = async (e) => {
      const file = e.target.files[0]
      const bodyFromData = new FormData()
      bodyFromData.append('image', file)
      setLoadingUploadAttraction(true)
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
         setImageAttraction(data)
         setLoadingUploadAttraction(false)
      } catch (error) {
         setErrorUploadAttraction(error.message)
         setLoadingUploadAttraction(false)
      }
   }



   const backHandler = () => {
      props.history.push('/tourlist')
   }


   const createAttractionHandler = async () => {
      let obj = { tourId, titleAttraction, descAttraction, imageAttraction, adressAttraction, coordinates}
      await Axios.post('/api/attraction', obj , { headers: { Authorization: `Bearer ${userInfo.token}` } })
      getDataAttraction()
   }

   const updateAttractionHandler = async () => {
      let obj = {attractionId, titleAttraction, descAttraction, imageAttraction, adressAttraction, lat: coordinates[0], lon: coordinates[1]}
      await Axios.put(`/api/attraction/${tourId}`, obj , { headers: { Authorization: `Bearer ${userInfo.token}` } })
      getDataAttraction()
   }

   const getData = async () => {
      const listCity2 = await Axios.get('/api/city/cityName')
      const arrCity = listCity2.data.city.map(city => {
         return city.cityName
      })
      setListCity(arrCity)


      const listCountry2 = await Axios.get('/api/country/countryName')
     
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

   const editAttractionHandler = async (a) => {
      setTitleAttraction(a.titleAttraction)
      setDescAttraction(a.descAttraction)
      setImageAttraction(a.imageAttraction)
      setAdressAttraction(a.adressAttraction)
      setCoordinates([a.lon, a.lat])
      setAttractionId(a._id)
   }


   const submitHandler = async (e) => {
      e.preventDefault();


      await dispatch(
         updateTour({
            _id: tourId,
            title, price, image, category, label, desc, additionalInfo, country, city, uploadedImage
         })
      )
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


   const getDataAttraction = async () => {
      let attractions  = await Axios.get(`/api/attraction/${tourId}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
      attractions = attractions.data.attractions.attractions

       setDataAttraction(attractions) 
    }
  
    useEffect(() => {
      getDataAttraction()
    }, [dispatch])

   return (
      <div>













         <div className="cartSection">
            <div className="cartContainer">


               <div className='row'>
                  <div className='col-xs-12'>
                     <div className='header_section'>
                        <h1 className='header_text_profile'>
                           Создание тура
                        </h1>
                     </div>
                  </div>
               </div>

               <div className="grid-cart-profile">
                  <section className="grid-main-column-cart">
                     <h1 className="head-text">Параметры тура</h1>
                     <div className="item-cart">


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
                                                   Заголовок
                                                </span>
                                                <input required className="form-input" value={title} onChange={e => setTitle(e.target.value)} type="text" />
                                             </label>
                                          </div>

                                          <div className='form-box'>
                                             <label className="form-box__field" >
                                                <span className='form-label'>
                                                   Цена
                                                </span>
                                                <input className="form-input" value={price} onChange={e => setPrice(e.target.value)} type="text" />
                                             </label>
                                          </div>

                                          <div className='form-box'>
                                             <label className="form-box__field" >
                                                <span className='form-label'>
                                                   Главное изображение
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
                                                   Галерея изображений
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
                                                   Категория
                                                </span>
                                                <div>
                                                   <Dropdown type="text" options={listCategory && listCategory} value={category} onChange={changeCategoryHandler} placeholder="Select an option" />
                                                </div>
                                             </label>
                                          </div>



                                          <div className='form-box'>
                                             <label className="form-box__field" >
                                                <span className='form-label'>
                                                   Выберите страну
                                                </span>

                                                <div>
                                                   <Dropdown type="text" options={listCountry && listCountry} value={tour && tour.country} onChange={changeCountryHandler} placeholder="Select an option" />
                                                </div>

                                             </label>
                                          </div>


                                          <div className='form-box'>
                                             <label className="form-box__field" >
                                                <span className='form-label'>
                                                   Выберите город
                                                </span>
                                                <Dropdown type="text" options={listCity && listCity} value={listCity ? listCity[0] : (tour && tour.city)} onChange={changeCityHandler} placeholder="Select an option" />
                                             </label>
                                          </div>



                                          <div className='form-box'>
                                             <label className="form-box__field" >
                                                <span className='form-label'>
                                                   Описание
                                                </span>
                                                <input className="form-input" value={desc} type="text" onChange={e => setDesc(e.target.value)} />
                                             </label>
                                          </div>

                                          <div className='form-box'>
                                             <label className="form-box__field" >
                                                <span className='form-label'>
                                                   Дополнительная информация
                                                </span>
                                                <textarea className="form-input-textarea" value={additionalInfo} type="text" onChange={e => setAdditionalInfo(e.target.value)} ></textarea>
                                             </label>
                                          </div>
                                          {success && (
                                             <MessageBox variant="success">
                                                Тур успешно обновлён
                                             </MessageBox>
                                          )}
                                          <button className='btn_auth' type="submit" >
                                             Создать
                                          </button>
                                          <button className='btn_auth' type="submit" onClick={backHandler} >
                                             Вернуться к списку туров
                                          </button>


                                       </>)
                                 }
                              </div>
                           </>
                        </form>



                     </div>


                  </section>




                  <section className="grid-checkout-column">
                     <h1 className="head-text">Добавить достопримечательности </h1>
                     <div className="item-checkout">
                        <div className='form-box'>
                           <label className="form-box__field" >
                              <span className='form-label'>
                                 Название
                              </span>
                              <input required className="form-input" value={titleAttraction} onChange={e => setTitleAttraction(e.target.value)} type="text" />
                           </label>
                        </div>

                        <div className='form-box'>
                           <label className="form-box__field" >
                              <span className='form-label'>
                                 Описание
                              </span>
                              <input className="form-input" value={descAttraction} onChange={e => setDescAttraction(e.target.value)} type="text" />
                           </label>
                        </div>

                        <div className='form-box'>
                           <label className="form-box__field" >
                              <span className='form-label'>
                                 Изоображение
                              </span>
                              <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler2} />
                              {loadingUpload && <LoadingBox></LoadingBox>}
                              {errorUpload && (
                                 <MessageBox variant="danger">{errorUpload}</MessageBox>
                              )}
                           </label>
                        </div>


                        <div>
                           <div >
                              <label className="form-box__field" >
                                 <span className='form-label'>
                                    Адрес места (для координат)
                                 </span>
                                 <input className="form-input" value={adressAttraction} onChange={e => setAdressAttraction(e.target.value)} type="text" />
                              </label>
                           </div>

                           <div >
                              <label className="form-box__field" >
                                 <span className='form-label'>
                                    Координаты (долгота и широта) <button className='btn_coordinate' onClick={getCoordinate}>Получить координаты</button>
                                 </span>
                                 <div style={divStyle}>
                                    <input className="form-input-coordinate" value={coordinates && coordinates[0]} type="text" />
                                    <input className="form-input-coordinate" value={coordinates && coordinates[1]} type="text" />
                                 </div>

                              </label>
                           </div>
                           <div style={divStyle2}>
                              {coordinates &&
                                 <YMaps>
                                    <Map width='100%'

                                       defaultState={{
                                          center: [coordinates[1], coordinates[0]],
                                          zoom: 10,
                                       }}
                                    >
                                       <Placemark geometry={[coordinates[1], coordinates[0]]} />
                                    </Map>
                                 </YMaps>
                              }

                           </div>
                           <button className='btn_auth' type="submit" onClick={createAttractionHandler} >
                              Добавить
                           </button>
                           <button className='btn_auth' type="submit" onClick={updateAttractionHandler} >
                              Обновить
                           </button>
                        </div>
                     </div>


                     <h1 className="head-text">Таблица достопримечательностей</h1>
                     <div className="item-cart">
                        <table className="table">
                           <thead>
                              <tr>
                                 <th>Название</th>
                                 <th>Описание </th>
                                 <th>Изображение </th>
                                 <th>Адрес</th>
                                 <th>координаты</th>
                                 <th>Кнопка</th>
                              </tr>
                           </thead>
                           <tbody>
                              {dataAttraction && dataAttraction.filter(row => !deletedAttraction.includes(row._id)).map(a => (
                   
                                 <tr key={a._id}>
                                    <td>{a.titleAttraction}</td>
                                    <td>{a.descAttraction}</td>
                                    <td>{a.imageAttraction}</td>
                                    <td>{a.adressAttraction}</td>
                                    <td>{a.lon}  -  {a.lat}</td>

                                    <td>
                                       <button
                                          type="button"
                                          className="btn_details_admin"
                                          onClick={() => editAttractionHandler(a)}
                                       >
                                          Edit
                                       </button>
                                       <button
                                          type="button"
                                          className="btn_details_admin"
                                           onClick={() => deleteHandler(a)} 
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

  

                  <div className='section_message'>

                  </div>
               </div>
            </div>
         </div>



















         {/* <div className="cartSection">
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
                                                <Dropdown type="text" options={listCategory && listCategory} value={category} onChange={changeCategoryHandler} placeholder="Select an option" />
                                             </div>
                                          </label>
                                       </div>



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


                                       <div className='form-box'>
                                          <label className="form-box__field" >
                                             <span className='form-label'>
                                                Select a city
                                             </span>
                                             <Dropdown type="text" options={listCity && listCity} value={listCity ? listCity[0] : (tour && tour.city)} onChange={changeCityHandler} placeholder="Select an option" />
                                          </label>
                                       </div>



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
         </div> */}
      </div>
   )
}

export default TourEditPage