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
   const tourListAdvanceSearch3 = useSelector(state => state.tourListAdvanceSearch3)
   const { loading, error, tours } = tourListAdvanceSearch3







   /*   const paginationSubmit = async () => {
       const resp = await Axios.get(`/api/tours?country=Russia&page=${pageNumber}`)
       setnewTours(tours.data.tours)
     } */




   return (
      <>
         {loading ? (
         
         <>
                              <div className='grid'>
                        <div className='grid__section'>
                           <div className='grid__content__container'>
                              <div className='grid__content'>
                                 <h1 className='text-center'>
  
                                 </h1>
                                 <br />  <br />
                                 <div className="text-divider__divider"></div>
                                 <br />
                                 <h3 className='text-center2'>
     
                                 </h3>
                                 <br />
                                 <div className="text-divider__divider"></div>
                                 <br />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='loading'><LoadingBox></LoadingBox></div>
         </>
         

         )
            :
            error ? (
      
                     <div class="message_box_tour"><MessageBox variant="danger">{error}</MessageBox></div>
            )
               : (
                  <>


                     <div className='grid'>
                        <div className='grid__section'>
                           <div className='grid__content__container'>
                              <div className='grid__content'>
                                 <h1 className='text-center'>

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
                                 {console.log(searchInfo.cityImage)}
                                 <img alt="" className="grid__image" src={searchInfo && searchInfo.categoryImage && searchInfo.categoryImage} />
                                 <img alt="" className="grid__image" src={searchInfo && searchInfo.countryImage && searchInfo.countryImage} />
                                 
                              </button>
                           </div>
                        </div>
                     </div>


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

                     </div>

                  </>
               )
         }
      </>
   )
}

export default TourCategoryPage




