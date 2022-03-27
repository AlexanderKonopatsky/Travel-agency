import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { searchTours } from '../redux/actions/tourActions'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from 'react-router-dom';



export default function SearchPage(props) {
   const searchTitle = props.match.params.title

   const dispatch = useDispatch()

   const tourSearch = useSelector(state => state.tourSearch)
   const { loading, error, tours } = tourSearch

   useEffect(() => {
      dispatch(searchTours(searchTitle))
   }, [dispatch, searchTitle])

   return (
      <div className="search_div">

         {loading ? (

            <div className='header_section_'>
               {loading && <LoadingBox></LoadingBox>}
            </div>

         ) : error ? (
            <div className='header_section_'>
               <MessageBox variant="danger">{error}</MessageBox>
            </div>
         ) : (
            <>


               {tours &&
                  <div className='row'>
                     <div className='col-xs-12'>
                        <div className='header_section'>
                           <h1 className='header_text_search'>
                              {tours && tours.length} results for: {searchTitle}
                           </h1>
                           {tours.map(tour => (
                              <div key={tour._id}>

                                 <Link className='href_search' to={`/tour/${tour._id}`}>

                                    <div className="href_search_result">{tour.title}</div>
                                 </Link>
                                 <div className="search_text_body">
                                    {tour.desc}
                                 </div>
                              </div>

                           ))}
                        </div>
                     </div>
                  </div>
               }
            </>
         )}
      </div>
   );
}
