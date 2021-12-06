import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { listTourByCategory } from "../redux/actions/tourActions";
import DatePicker from "react-datepicker";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import '../components/MainSection.css';
import CardItemCategory from '../components/CardItemCategory';

function TourCategoryPage(props) {
  const category = props.match.params.category



  const dispatch = useDispatch()
  const tourListByCategory = useSelector(state => state.tourListByCategory)
  const { loading, error, tours } = tourListByCategory

  useEffect(() => {
    dispatch(listTourByCategory(category))
  }, [category, dispatch])



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
                        {category}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='grid__section '>
                  <div className='grid__wrap'>
                    <button className='grid__gallery-button' >
                      <img alt="" className="grid__image" src="/images/image__1629999624.png" />
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

                  {/*                   <div className="__tour-card"></div>
                  <div className="__tour-card"></div>
                  <div className="__tour-card"></div>
                  <div className="__tour-card"></div>
                  <div className="__tour-card"></div>
                  <div className="__tour-card"></div>  */}

                </div>
              </div>



              {/*               <div className="container" >
              <div class='tour-card card-grid--3-columns__card'>
                {tours &&
                  tours.map(tour => {
                    return <CardItemCategory key={tour._id} tour={tour} />
                  })
                }
                </div>

              </div> */}

              {/* <section className="main-section">
                <div className="main-container">
                  <div className="grid-section">
                    <div className="grid-sidebar">
                      <div className='head-text'>
                        Book a Tour
                      </div>
                      <div className="grid-with-sidebar">
                        <DatePicker
                          selected={startDate}
                          onChange={onChange}
                          startDate={startDate}
                          endDate={endDate}
                          selectsRange
                          inline
                        />
                        <input type="submit" value="See Available Tours" class="action-button-tour" />
                        <input onClick={addToCartHandler} type="submit" value="Add tour to cart" class="action-button-tour" />

                      </div>
                    </div>
                    <div>

                    </div>

                    <div className="grid-main-column">
                      <div className='head-text'>
                        Tour Details
                      </div>
                      <div className="box">
                        <div className="box-head">
                          Tour description
                        </div>
                        <div className="box-body">
                          {tour.desc}
                        </div>
                      </div>
                      <div className='head-text'>
                        Tour Details
                      </div>
                      <div className="box">
                        <div className="box-head">
                          Tour description
                        </div>
                        <div className="box-body">
                          {tour.desc}
                        </div>
                        <div className="box-head">
                          Tour description
                        </div>
                        <div className="box-body">
                          {tour.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}

            </>
          )
      }
    </>
  )
}

export default TourCategoryPage