import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/SignUp.css'
import Slider from 'rc-slider';
import Range from 'rc-slider'
import 'rc-slider/assets/index.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Rating from '../components/rating';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import { listTourAdvancedSearch } from "../redux/actions/tourActions";
import { listTourAdvancedSearch2 } from "../redux/actions/tourActions";



function AdvancedSearch(props) {



   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [currentStep, setCurrentStep] = useState(1)
   const [sliderValueDuration, setSliderValueDuration] = useState(7)
   const [sliderValueRating, setSliderValueRating] = useState(50)
   const [sliderValuePriceFrom, setSliderValuePriceFrom] = useState(50)
   const [sliderValuePriceTo, setSliderValuePriceTo] = useState(100)
   const [listCategory, setListCategory] = useState('')
   const [listCity, setListCity] = useState('')
   const [listCountry, setListCountry] = useState('')
   const [category, setCategory] = useState('')
   const [country, setCountry] = useState('')
   const [city, setCity] = useState('')
   const [obj, setObj] = useState({})

   const onSliderChangeDuration = value => setSliderValueDuration(value)
   const onSliderChangeRating = value => setSliderValueRating(value)
   const handleNextStep = e => setCurrentStep(currentStep + 1)
   const handlePrevStep = e => setCurrentStep(currentStep - 1)
   const changeCategory = data => setCategory(data.label)
   const changeCity = data => setCity(data.label)

   const onChange = (dates) => {
      console.log(dates)
      setEndDate(dates[1]);
      setStartDate(dates[0]);
   };

   const onSliderChangePriceFrom = (value) => {
      if (sliderValuePriceFrom > sliderValuePriceTo) {
         setSliderValuePriceFrom(value)
         setSliderValuePriceTo(value)
      } else {
         setSliderValuePriceFrom(value)
      }
   };

   const onSliderChangePriceTo = (value) => {
      setSliderValuePriceTo(value)
   };

   const changeCountry = async (data) => {
      setCountry(data.value)
      const listCityUpdate = await Axios.get(`/api/tours/cityInTheCountry?country=${data.value}`)
      setListCity(listCityUpdate.data)
   }

   const getData = async () => {
      const listCategory = await Axios.get('/api/tours/categories')
      setListCategory(listCategory.data)
      const listCountry = await Axios.get('/api/tours/country')
      setListCountry(listCountry.data.sort())
      const listCity = await Axios.get('/api/tours/city')
      setListCity(listCity.data)
   }

   useEffect(() => {
      getData()
   }, [])

    const dispatch = useDispatch()
 /*  const tourListAdvanceSearch = useSelector(state => state.tourListAdvanceSearch)
   const { loading, error, tours, page, pages } = tourListAdvanceSearch
 
   useEffect(() => {
     dispatch(listTourAdvancedSearch({priceFrom, priceTo, category, country, city, duration, rating, startDate, endDate }))
   }, [category, city, country, dispatch, duration, endDate, priceFrom, priceTo, rating, startDate]) */

   const submitHandler = (e) => {
      e.preventDefault()
      const categoryValue = category || listCategory[0]
      const countryValue = country || listCountry[0]
      const cityValue = city || listCity[0]
      const ratingValue = sliderValueRating / 10

      const object = {
         startDate,
         endDate,
         sliderValuePriceFrom,
         sliderValuePriceTo,
         categoryValue,
         countryValue,
         cityValue,
         sliderValueDuration,
         ratingValue,
         pageNumber: 1
      }

      dispatch(listTourAdvancedSearch2(object))

      console.log(object)
      props.history.push('/advancedSearchPage')
    /*   props.history.push(`/advancedSearchPage?
         priceFrom=${object.sliderValuePriceFrom}&
         priceTo=${object.sliderValuePriceTo}&
         category=${object.categoryValue}&
         country=${object.countryValue}&
         city=${object.cityValue}&
         duration=${object.sliderValueDuration}&
         rating=${object.ratingValue}&
         startDate=${object.startDate}&
         endDate=${object.endDate}`
      ) */
   }


   return (
      <>
         <form id="msform">

            <ul id="progressbar">

               <li class={currentStep >= 1 && 'active'}>{/* Range of days */}</li>
               <li class={currentStep >= 2 && 'active'}>{/* Range price */}</li>
               <li class={currentStep >= 3 && 'active'}>{/* Category */}</li>
               <li class={currentStep >= 4 && 'active'}>{/* Country */}</li>
               <li class={currentStep >= 5 && 'active'}>{/* City */}</li>
               <li class={currentStep >= 6 && 'active'}>{/* Duration */}</li>
               <li class={currentStep >= 7 && 'active'}>{/* Rating */}</li>

            </ul>

            <fieldset className={currentStep === 1 ? '' : 'hideFieldset'} >
               <h3 class="fs-subtitle">Шаг 1</h3>
               <h2 class="fs-title">Выберите диапазон дат</h2>
               <h1 class="fs-subtitle">Set a range of days</h1>
               <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
               />
               <h2 class="fs-subtitle">{startDate && String(startDate).slice(0, 16)} - {endDate && String(endDate).slice(0, 16)}  </h2>
               <h2 class="fs-subtitle"> </h2>

               <input type="button" name="next" class="next action-button" value="--->" onClick={handleNextStep} />
            </fieldset>

            <fieldset className={currentStep === 2 ? '' : 'hideFieldset'} >
               <h3 class="fs-subtitle">Шаг 2</h3>
               <h2 class="fs-title">Выберите диапазон цен</h2>
               <h1 class="fs-subtitle">От и до</h1>
               <Range
                  defaultValue={10}
                  onChange={onSliderChangePriceFrom}
                  max={1000}
               />
               <br></br>
               <Range
                  defaultValue={100}
                  onChange={onSliderChangePriceTo}
                  max={1000}
               />
               <h2 class="fs-subtitle">Диапазон цен от {sliderValuePriceFrom && sliderValuePriceFrom} $ - до {sliderValuePriceTo && sliderValuePriceTo} $</h2>
               <input type="button" name="previous" class="previous action-button" value="<---" onClick={handlePrevStep} />
               <input type="button" name="next" class="next action-button" value="--->" onClick={handleNextStep} />
            </fieldset>

            <fieldset className={currentStep === 3 ? '' : 'hideFieldset'} >
               <h3 class="fs-subtitle">Шаг 3</h3>
               <h2 class="fs-title">Выберите категорию</h2>
               <Dropdown type="text" options={listCategory} value={listCategory[0]} onChange={changeCategory} placeholder="Select an option" />
               <h2 class="fs-subtitle">Category - {category ? category : listCategory[0]}</h2>
               <input type="button" name="previous" class="previous action-button" value="<---" onClick={handlePrevStep} />
               <input type="button" name="next" class="next action-button" value="--->" onClick={handleNextStep} />
            </fieldset>

            <fieldset className={currentStep === 4 ? '' : 'hideFieldset'} >
               <h3 class="fs-subtitle">Шаг 4</h3>
               <h2 class="fs-title">Выберите страну</h2>
               <Dropdown type="text" options={listCountry} value={listCountry[0]} onChange={changeCountry} placeholder="Select an option" />
               <h2 class="fs-subtitle">Country - {country ? country : listCountry[0]}</h2>
               <input type="button" name="previous" class="previous action-button" value="<---" onClick={handlePrevStep} />
               <input type="button" name="next" class="next action-button" value="--->" onClick={handleNextStep} />
            </fieldset>

            <fieldset className={currentStep === 5 ? '' : 'hideFieldset'} >
               <h3 class="fs-subtitle">Шаг 5</h3>
               <h2 class="fs-title">Выберите город</h2>
               <Dropdown type="text" options={listCity} value={listCity[0]} onChange={changeCity} placeholder="Select an option" />
               <h2 class="fs-subtitle">City -{city ? city : listCity[0]}</h2>
               <input type="button" name="previous" class="previous action-button" value="<---" onClick={handlePrevStep} />
               <input type="button" name="next" class="next action-button" value="--->" onClick={handleNextStep} />
            </fieldset>


            <fieldset className={currentStep === 6 ? '' : 'hideFieldset'} >
               <h3 class="fs-subtitle">Шаг 6</h3>
               <h2 class="fs-title">Выберите продолжительность</h2>
               <Slider
                  min={0}
                  max={365}
                  defaultValue={7}
                  value={sliderValueDuration}
                  onChange={onSliderChangeDuration}
               />
               <h2 class="fs-subtitle">Duration {sliderValueDuration} days</h2>
               <input type="button" name="previous" class="previous action-button" value="<---" onClick={handlePrevStep} />
               <input type="button" name="next" class="next action-button" value="--->" onClick={handleNextStep} />
            </fieldset>

            <fieldset className={currentStep === 7 ? '' : 'hideFieldset'} >
               <h3 class="fs-subtitle">Шаг 7</h3>
               <h2 class="fs-title">Выберите рейтинг тура </h2>
               <Slider
                  min={0}
                  max={50}
                  value={sliderValueRating}
                  onChange={onSliderChangeRating}
               />
               <Rating rating={sliderValueRating / 10} />
               <input type="button" name="previous" class="previous action-button" value="<---" onClick={handlePrevStep} />
               <input type="submit" name="submit" class="submit action-button" value="Искать" onClick={submitHandler} />
            </fieldset>
         </form>
      </>
   )
}

export default AdvancedSearch