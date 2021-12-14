import React, { useState } from "react";
import './MainSection.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export function MainSection(props) {
  const { tour } = props

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
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
              </div>
              <div>
       {/*          <input type="submit" value="See Available Tours" class="action-button-tour" /> */}
                <input type="submit" value="Add tour to cart" class="action-button-tour" />
                {/* <button className="primary block">Add to Cart</button> */}
              </div>

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
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the
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
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the

                </div>

                <div className="box-head">
                  Tour description
                </div>
                <div className="box-body">
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the
                  This three-hour introduction to Berlin is designed to provide a perfect introduction to Berlin for first timers, or to reorient returning travelers to some of the city's most important sites, including the Brandenburg Gate, Holocaust Memorial, and the

                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export default MainSection