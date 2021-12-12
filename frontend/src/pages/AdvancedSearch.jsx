import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/SignUp.css'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Rating from '../components/rating';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import { listTourAdvancedSearch } from "../redux/actions/tourActions";

function AdvancedSearch(props) {



  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
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

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };



  const onSliderChangePrice = (value) => {
    setSliderValuePriceFrom(value[0])
    setSliderValuePriceTo(value[1])
  };

  const onSliderChangeDuration = value => setSliderValueDuration(value)
  const onSliderChangeRating = value => setSliderValueRating(value)
  const handleNextStep = e => setCurrentStep(currentStep + 1)
  const handlePrevStep = e => setCurrentStep(currentStep - 1)
  const changeCategory = data => setCategory(data.label)
  const changeCity = data => setCity(data.label)

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

/*   useEffect(() => {
    if(Object.keys(obj).length) {
      
    }

  }, [dispatch, obj]) */

  const submitHandler = (e) => {
    e.preventDefault()
    const categoryValue = category || listCategory[0]
    const countryValue = country || listCountry[0] 
    const cityValue = city || listCity[0]
    const ratingValue = sliderValueRating / 10
    console.log('!Object.keys(obj).length', Object.keys(obj).length)
    const object = {
      startDate, endDate, sliderValuePriceFrom, sliderValuePriceTo, categoryValue, countryValue, cityValue, sliderValueDuration, ratingValue, pageNumber: 1
    }
    props.history.push(`/advancedSearchPage?priceFrom=${object.sliderValuePriceFrom}&priceTo=${object.sliderValuePriceTo}&category=${object.categoryValue}&country=${object.countryValue}&city=${object.cityValue}&duration=${object.sliderValueDuration}&rating=${object.ratingValue}&startDate=${object.startDate}&endDate=${object.endDate}`)
    console.log('!Object.keys(obj).length', Object.keys(obj).length)
    
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
        <h3 class="fs-subtitle">This is step 1</h3>
          <h2 class="fs-title">Select range price</h2>


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

          <input type="button" name="next" class="next action-button" value="Next" onClick={handleNextStep} />
        </fieldset>





        <fieldset className={currentStep === 2 ? '' : 'hideFieldset'} >
        <h3 class="fs-subtitle">This is step 2</h3>
          <h2 class="fs-title">Select range price</h2>
      

          <h1 class="fs-subtitle">Set a price range</h1>
          <Range
            defaultValue={[10, 100]}
            onChange={onSliderChangePrice}
            max={1000}
          />
          <h2 class="fs-subtitle">Range {sliderValuePriceFrom} - {sliderValuePriceTo} $</h2>
          <input type="button" name="previous" class="previous action-button" value="Previous" onClick={handlePrevStep} />
          <input type="button" name="next" class="next action-button" value="Next" onClick={handleNextStep} />
        </fieldset>





        <fieldset className={currentStep === 3 ? '' : 'hideFieldset'} >
        <h3 class="fs-subtitle">This is step 3</h3>
          <h2 class="fs-title">Сhoose a category</h2>
   

          <Dropdown type="text" options={listCategory} value={listCategory[0]} onChange={changeCategory} placeholder="Select an option" />

          <h2 class="fs-subtitle">Category - { category ? category : listCategory[0] }</h2>

          <input type="button" name="previous" class="previous action-button" value="Previous" onClick={handlePrevStep} />
          <input type="button" name="next" class="next action-button" value="Next" onClick={handleNextStep} />
        </fieldset>




        <fieldset className={currentStep === 4 ? '' : 'hideFieldset'} >
        <h3 class="fs-subtitle">This is step 4</h3>
          <h2 class="fs-title">Сhoose a country</h2>
        

          <Dropdown type="text" options={listCountry} value={listCountry[0]} onChange={changeCountry} placeholder="Select an option" />

          <h2 class="fs-subtitle">Country - {country ? country : listCountry[0]}</h2>

          <input type="button" name="previous" class="previous action-button" value="Previous" onClick={handlePrevStep} />
          <input type="button" name="next" class="next action-button" value="Next" onClick={handleNextStep} />
        </fieldset>




        <fieldset className={currentStep === 5 ? '' : 'hideFieldset'} >
        <h3 class="fs-subtitle">This is step 5</h3>
          <h2 class="fs-title">Сhoose a city</h2>


          <Dropdown type="text" options={listCity} value={listCity[0]} onChange={changeCity} placeholder="Select an option" />

          <h2 class="fs-subtitle">City -{city ? city : listCity[0]}</h2>

          <input type="button" name="previous" class="previous action-button" value="Previous" onClick={handlePrevStep} />
          <input type="button" name="next" class="next action-button" value="Next" onClick={handleNextStep} />
        </fieldset>







        <fieldset className={currentStep === 6 ? '' : 'hideFieldset'} >
          <h3 class="fs-subtitle">This is step 6</h3>
          <h2 class="fs-title">Сhoose a duration</h2>
          <Slider
            min={0}
            max={365}
            defaultValue={7}
            value={sliderValueDuration}
            onChange={onSliderChangeDuration}
          />
          <h2 class="fs-subtitle">Duration {sliderValueDuration} days</h2>
          <input type="button" name="previous" class="previous action-button" value="Previous" onClick={handlePrevStep} />
          <input type="button" name="next" class="next action-button" value="Next" onClick={handleNextStep} />
        </fieldset>





        <fieldset className={currentStep === 7 ? '' : 'hideFieldset'} >
          <h3 class="fs-subtitle">This is step 7</h3>
          <h2 class="fs-title">Choose a tour rating </h2>
          <Slider
            min={0}
            max={50}

            value={sliderValueRating}
            onChange={onSliderChangeRating}
          />
          <Rating rating={sliderValueRating / 10} />
          <input type="button" name="previous" class="previous action-button" value="Previous" onClick={handlePrevStep} />
          <input type="submit" name="submit" class="submit action-button" value="Submit" onClick={submitHandler} />
        </fieldset>
      </form>
    </>
  )
}

export default AdvancedSearch