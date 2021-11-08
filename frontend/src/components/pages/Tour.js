import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { detailsTour } from "../../redux/actions/tourActions";
import DatePicker from "react-datepicker";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import Footer from "../Footer"
import "react-datepicker/dist/react-datepicker.css";
import '../MainSection.css';

function Tour(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const tourId = props.match.params.id 
  const dispatch = useDispatch()
  const tourDetails = useSelector(state => state.tourDetails)
  const { loading, error, tour } = tourDetails 
  
  useEffect(() => {
    dispatch(detailsTour(tourId))
  }, [dispatch, tourId])

  const addToCartHandler = () => {
    props.history.push(`/cart/${tourId}?startDate=${startDate}&endDate=${endDate}`)
  }
  
  return (
    <>
        {loading? ( <LoadingBox></LoadingBox> )
         :
         error? ( <div class="message_box_tour"><MessageBox variant="danger">{error}</MessageBox></div>  ) 
         : (
           <>
          <div className='grid'>
          <div className='grid__section'>
            <div className='grid__content__container'>
              <div className='grid__content'>
                <h1 className='text-center'>
                   {tour.title} 
                </h1>
              </div>
            </div>
          </div>
          <div className='grid__section '>
            <div className='grid__wrap'>
              <button className='grid__gallery-button' >
                <img alt="" className="grid__image"  src={tour.image}  />
              </button>
            </div>
          </div>
        </div>
  
        <section className="main-section">
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
                  {/* <button className="primary block">Add to Cart</button> */}
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
        </section>
        <Footer />
        </>
         )
        }
    </>
  )
}

export default Tour