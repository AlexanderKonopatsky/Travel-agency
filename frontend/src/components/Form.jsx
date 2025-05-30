import React, { useState, useEffect } from "react";
import './Form.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTourAdvancedSearch3 } from "../redux/actions/tourActions";

export function Form(props) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [count, setCount] = useState(2)
  const [listCity, setListCity] = useState('')
  const [city, setCity] = useState('')

  let history = useHistory();



  const decrement = () => {
    if (count > 1) setCount(count - 1)
  }

  const increment = () => {
    if (count < 12) setCount(count + 1)
  }


  const getData = async () => {
    const listCity = await Axios.get('/api/tours/city')
    if (listCity) {
      setListCity(listCity.data.sort())
    } else {
      setListCity(['Not found', 'sdfsdf'])
    }

  }

  /*   const changeCountryHandler = async (data) => {
      const listCityUpdate = await Axios.get(`/api/tours/cityInTheCountry?country=${data.value}`)
      setListCity(listCityUpdate.data)
    } */

  const changeCityHandler = (data) => {
    if (listCity !== '') {
      setCity(data.value)
    }
  }
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault();

    const cityName = city || listCity[0]

    const object = {
      startDate,
      endDate,
      cityName,
      count
   }

   dispatch(listTourAdvancedSearch3(object))

   console.log(object)
   history.push(`/searchByForm`)

    //history.push(`/advancedSearchPage?city=${city || listCity[0]}&count=${count}`)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="booking__container">
      <form method="get" onSubmit={submitHandler}>

        <div className="booking">
          <div className="booking__section">
            <div className="booking__section__top_city">
              <Dropdown type="text" options={listCity && listCity} value={listCity && listCity[0]} onChange={changeCityHandler} placeholder="Select an option" />
            </div>
            <div className="booking__section__bottom">
              <label className="label" for="city_id">Город</label>
            </div>
          </div>
          <div className="booking__section">
            <div className="booking__section__top">
              <DatePicker name="start_date" id="booking-start-date" className="booking__input" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="MMMM d, yyyy" />
            </div>
            <div className="booking__section__bottom">
              <label className="label" for="booking-start-date">Дата начала</label>
            </div>
          </div>
          <div className="booking__section">
            <div className="booking__section__top">
              <DatePicker name="end_date" id="booking-end-date" className="booking__input" selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="MMMM d, yyyy" />
            </div>
            <div className="booking__section__bottom">
              <label className="label" for="booking-end-date">Дата окончания</label>
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
                  readOnly="readonly" />
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
              <label className="label">Кол-во человек</label>

            </div>
          </div>
          <div className="booking__section">

            <button name="button" type="submit" className="booking__btn">Поиск туров</button>

          </div>
        </div>
      </form>
    </div>
  );
}


export default Form