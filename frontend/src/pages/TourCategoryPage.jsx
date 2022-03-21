import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { listTourByCategory } from "../redux/actions/tourActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import '../components/MainSection.css';
import CardItemCategory from '../components/CardItemCategory';
import { getDefaultLocale } from "react-datepicker";
import Axios from "axios";


function TourCategoryPage(props) {
   const [searchInfo, setSearchInfo] = useState('')
   const params = new URLSearchParams(props.location.search);
   const path = props.location.pathname
   const pageNumber = params.get('page'); // bar
   const next = params.get('next'); // bar
   const category = props.match.params.category
   const country = props.match.params.country
   const city = props.match.params.city
   const searchType = category || country || city
   const dispatch = useDispatch()
   const tourListByCategory = useSelector(state => state.tourListByCategory)
   const { loading, error, tours, page, pages } = tourListByCategory

   //console.log('params', searchType,  props.match.params.city, props.match.params.country, props.match.params.category, props.match.params)
   console.log('///', props.location.pathname.indexOf('country'))



   useEffect(() => {
      if (category) {
         dispatch(listTourByCategory({ category, typeReq: 'category', pageNumber }))
      } else if (country) {
         dispatch(listTourByCategory({ country, typeReq: 'country', pageNumber }))
      } else if (city) {
         dispatch(listTourByCategory({ city, typeReq: 'city', pageNumber }))
      }
      getData()
   }, [category, city, country, dispatch, next, pageNumber])

   /*   const paginationSubmit = async () => {
       const resp = await Axios.get(`/api/tours?country=Russia&page=${pageNumber}`)
       setnewTours(tours.data.tours)
     } */


   const getData = async () => {
      let objResult
      if (path.indexOf('country') === 1) {
         objResult = await Axios.get(`/api/country/search/${searchType}`)
         setSearchInfo(objResult.data.country)
      } else if (path.indexOf('city') === 1) {
         objResult = await Axios.get(`/api/city/${searchType}`)
         setSearchInfo(objResult.data.city)
      } else if (path.indexOf('category') === 1) {
         objResult = await Axios.get(`/api/categories/${searchType}`)
         setSearchInfo(objResult.data.category)
      }

   }

   return (
      <>
         {loading ? (<LoadingBox></LoadingBox>)
            :
            error ? (<div class="message_box_tour"><MessageBox variant="danger">{error}</MessageBox></div>)
               : (
                  <>


                     <div className='grid'>
                        <div className='grid__section'>
                           <div className='grid__content__container'>
                              <div className='grid__content'>
                                 <h1 className='text-center'>
                                    {console.log( searchInfo )}
                                 {searchInfo && searchInfo.cityName && searchInfo.cityName}
                                 {searchInfo && searchInfo.countryName && searchInfo.countryName}
                                 {searchInfo && searchInfo.categoryName && searchInfo.categoryName}
                                 </h1>
                                 <br />  <br />
                                 <div className="text-divider__divider"></div>
                                 <br />
                                 <h3 className='text-center2'>
                                 {searchInfo && searchInfo.cityDesc && searchInfo.cityDesc}
                                 {searchInfo && searchInfo.countryDesc && searchInfo.countryDesc}
                                 {searchInfo && searchInfo.categoryDesc && searchInfo.categoryDesc}
                                 </h3>
                                 <br />
                                 <div className="text-divider__divider"></div>
                                 <br />
            {/*                      <h2 className='text-center2'>
                                    <Rating rating={updateRating && updateRating} numReviews={updateRating && updateRating} />
                                 </h2> */}

                              </div>
                           </div>
                        </div>
                        <div className='grid__section '>
                           <div className='grid__wrap'>
                              <button className='grid__gallery-button' >
                                 <img alt="" className="grid__image" src={searchInfo && searchInfo.cityImage && searchInfo.cityImage} />
                                 <img alt="" className="grid__image" src={searchInfo && searchInfo.categoryImage && searchInfo.categoryImage} />
                              </button>
                           </div>
                        </div>
                     </div>



                     {/*               <div className='grid'>
                <div className='grid__section'>
                  <div className='grid__content__container'>
                    <div className='grid__content'>
                      <h1 className='text-center'> 
                        {searchInfo && searchInfo.countryDesc}
                        {searchInfo && searchInfo.cityDesc}
                         {console.log('!!!!!!!!!!!!!!!!!', searchInfo)}
                        {category && tours[0].categoryS.categoryDesc}
                        {country && country}
                        {city && city}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='grid__section '>
                  <div className='grid__wrap'>
                    <button className='grid__gallery-button' >
                      {category && <img alt="" className="grid__image" src={tours[0].categoryS.categoryImage} /> }
                    </button>
                  </div>
                </div>
              </div> */}


                     <div className="card_container">
                        <div className="card-grid-columns">


                           {tours &&
                              tours.map(tour => (
                                 <div className="__tour-card">
                                    <CardItemCategory key={tour._id} tour={tour} />
                                 </div>
                              ))
                           }


                        </div>
                        <div className="row center pagination">
                           {[...Array(pages).keys()].map((x) => (
                              <Link
                                 className={x + 1 === page ? 'active' : ''}
                                 key={x + 1}
                                 to={`/country/${searchType}?page=${x + 1}`}

                              >
                                 {x + 1}
                              </Link>
                           ))}

                        </div>
                     </div>

                  </>
               )
         }
      </>
   )
}

export default TourCategoryPage




