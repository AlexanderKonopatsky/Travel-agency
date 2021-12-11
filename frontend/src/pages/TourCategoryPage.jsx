import React, {  useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { listTourByCategory } from "../redux/actions/tourActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import '../components/MainSection.css';
import CardItemCategory from '../components/CardItemCategory';


function TourCategoryPage(props) {
  const params = new URLSearchParams(props.location.search);
  const pageNumber = params.get('page'); // bar
  const next = params.get('next'); // bar
  const category = props.match.params.category
  const country = props.match.params.country
  const city = props.match.params.city
  const searchType = category || country || city
  const dispatch = useDispatch()
  const tourListByCategory = useSelector(state => state.tourListByCategory)
  const { loading, error, tours, page, pages } = tourListByCategory


  useEffect(() => {
 if (category) {
      dispatch(listTourByCategory({ category, typeReq: 'category', pageNumber }))
    } else if (country) {
      dispatch(listTourByCategory({ country, typeReq: 'country', pageNumber }))
    } else if (city) {
      dispatch(listTourByCategory({ city, typeReq: 'city', pageNumber }))
    }
  }, [category, city, country, dispatch, next, pageNumber])

/*   const paginationSubmit = async () => {
    const resp = await Axios.get(`/api/tours?country=Russia&page=${pageNumber}`)
    setnewTours(tours.data.tours)
  } */

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
                        {category && category}
                        {country && country}
                        {city && city}
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




