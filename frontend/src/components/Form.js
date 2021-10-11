import React, { useState } from "react";
import './Form.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export function Form() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [count, setCount] = useState(2)

  const options = [
    'Russia', 'Belarus', 'Germany', 'Italy',
  ];
  const defaultOption = options[0];


  const decrement = () => {
    if (count > 1) setCount(count - 1)
  }

  const increment = () => {
    if (count < 12) setCount(count + 1)
  }



  return (
    <div  className="booking__container">
      <form  action="/booking_bars" method="post">
        <div className="booking">
          <div className="booking">
            <div className="booking__section">
              <div className="booking__section__top">
                <Dropdown type="text" options={options} value={defaultOption} placeholder="Select an option" />
              </div>
              <div className="booking__section__bottom">
                <label className="label" for="city_id">City</label>
              </div>
            </div>
            <div className="booking__section">
              <div className="booking__section__top">
                <DatePicker name="start_date" id="booking-start-date" className="booking__input" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="MMMM d, yyyy" />
              </div>
              <div className="booking__section__bottom">
                <label className="label" for="booking-start-date">Start Date</label>
              </div>
            </div>
            <div className="booking__section">
              <div className="booking__section__top">
                <DatePicker name="end_date" id="booking-end-date" className="booking__input" selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="MMMM d, yyyy" />
              </div>
              <div className="booking__section__bottom">
                <label className="label" for="booking-end-date">End Date</label>
              </div>
            </div>
            <div className="booking__section">
              <div className="booking__section__top">
                <div className="booking__pax-container">
                  <button onClick={decrement} className="form-incrementer__btn" data-decrement="" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="#1a1a1a">
                      <g transform="translate(3.603 3)">
                        <path d="M5.3,9h8.3v2H5.3V9z"></path>
                      </g>
                      <path
                        d="M13,2c6.1,0,11,4.9,11,11s-4.9,11-11,11S2,19.1,2,13S6.9,2,13,2 M13,1C6.4,1,1,6.4,1,13s5.4,12,12,12s12-5.4,12-12   S19.6,1,13,1L13,1z">
                      </path>
                    </svg>

                  </button>
                  <input type="number" id="booking-pax" value={count}
                    className="form-incrementer__input form-incrementer__input__booking" required="required"
                    readonly="readonly" />
                  <button onClick={increment} className="form-incrementer__btn" data-increment="" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 26 26" fill="#1a1a1a">
                      <path
                        d="M13,2c6.1,0,11,4.9,11,11s-4.9,11-11,11S2,19.1,2,13S6.9,2,13,2 M13,1C6.4,1,1,6.4,1,13s5.4,12,12,12s12-5.4,12-12   S19.6,1,13,1L13,1z">
                      </path>
                      <g transform="translate(4 3)">
                        <path className="st1" d="M8,9V4.8H10V9h4.2V11H10v4.2H8V11H3.8V9H8z"></path>
                      </g>
                    </svg>

                  </button>
                </div>
              </div>
              <div className="booking__section__bottom">
                <label className="label">Participants</label>
              </div>
            </div>
          </div>
          <div className="booking__action">
            <button name="button" type="submit" className="booking__btn">Find Tours</button>
          </div>
        </div>
      </form>
    </div>
  );
}


export default Form