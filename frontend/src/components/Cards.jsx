import React, { useState, useEffect, useRef } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import CardItemHistory from './CardItemHistory';
import CardItemRecomendation from './CardItemRecomendation';
import MessageBox from './MessageBox'
import LoadingBox from './LoadingBox'
import { useDispatch, useSelector } from 'react-redux';
import { listTour } from '../redux/actions/tourActions'
import { gsap } from "gsap";
const Axios = require('axios')



function Cards() {
  const dispatch = useDispatch()
  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours, toursHistory} = tourList

  const [scrollX1, setscrollX1] = useState(0);
  const [scrolEnd1, setscrolEnd1] = useState(false);

  const [scrollX2, setscrollX2] = useState(0);
  const [scrolEnd2, setscrolEnd2] = useState(false);
  

  /*   const listTourByCountryBelarus = useSelector((state) => state.listTourByCountryBelarus)
    const { loading: loadingToursByCountry, error: errorToursByCountry, tours : toursByCountry } = listTourByCountryBelarus */
  //---------------------------

  let scrl = useRef(null);
  let scrl2 = useRef(null);


  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

 const [dataHistory, setDataHistory] = useState(false);
 const [dataRecomendation, setDataRecomendation] = useState();

  useEffect(() => {
    dispatch(listTour())
    if (userInfo) {
      Axios.get(`api/tours/getHistory?userId=${userInfo._id}`).then((res) => {setDataHistory(res.data)})
      Axios.get(`api/tours/getRecomendation?userId=${userInfo._id}`).then(res => {setDataRecomendation(res.data)})
    }

  }, [dispatch, userInfo])






  //Slide click
  const slide1 = (shift) => {

    scrl.current.scrollLeft += shift;
    setscrollX1(scrollX1 + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd1(true);
    } else {
      setscrolEnd1(false);
    }
  };

  const slide2 = (shift) => {
    scrl2.current.scrollLeft += shift;
    setscrollX2(scrollX2 + shift);

    if (
      Math.floor(scrl2.current.scrollWidth - scrl2.current.scrollLeft) <=
      scrl2.current.offsetWidth
    ) {
      setscrolEnd2(true);
    } else {
      setscrolEnd2(false);
    }
  };

  //Anim
  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1.5 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1.5 });
    gsap.to(e.target, { scale: 1 });
  };

  const scrollCheck1 = () => {
    setscrollX1(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd1(true);
    } else {
      setscrolEnd1(false);
    }
  };

  const scrollCheck2 = () => {
    setscrollX2(scrl2.current.scrollLeft);
    if (
      Math.floor(scrl2.current.scrollWidth - scrl2.current.scrollLeft) <=
      scrl2.current.offsetWidth
    ) {
      setscrolEnd2(true);
    } else {
      setscrolEnd2(false);
    }
  };
  //---------------------------
  return (
    <div className='container__main'>
      <div className='cards'>

        {loading ? (<LoadingBox></LoadingBox>)
          :
          error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
              <>

                <div>

                  <div className="head_text_tours">Лучшие в Беларуси</div>

                  <div className="scroll2">

                    {scrollX1 !== 0 && (
                      <button
                        className="prev"
                        onClick={() => slide1(-500)}
                        onMouseEnter={(e) => anim(e)}
                        onMouseLeave={(e) => anim2(e)}
                      >
                        <i className="fa fa-angle-left"></i>
                      </button>
                    )}
                    <ul className="scroll_ul" ref={scrl} onScroll={scrollCheck1}>
                 {   console.log('$$$$$$$$$', tours)}
                      {
                  
                        tours.map(tour => {
                          if (tour.country === 'Беларусь') {
                            return <CardItem key={tour._id} tour={tour} />
                          } else {
                            return false
                          }
                        })}
                    </ul>
                    {!scrolEnd1 && (
                      <button
                        className="next"
                        onClick={() => slide1(+500)}
                        onMouseEnter={(e) => anim(e)}
                        onMouseLeave={(e) => anim2(e)}
                      >
                        <i className="fa fa-angle-right"></i>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="head_text_tours">Лучшие в России</div>

                  <div className="scroll2">

                    {scrollX2 !== 0 && (
                      <button
                        className="prev"
                        onClick={() => slide2(-500)}
                        onMouseEnter={(e) => anim(e)}
                        onMouseLeave={(e) => anim2(e)}
                      >
                        <i className="fa fa-angle-left"></i>
                      </button>
                    )}
                    <ul className="scroll_ul" ref={scrl2} onScroll={scrollCheck2}>
                      {
                        tours.map(tour => {
                          if (tour.country === 'Россия') {
                            return <CardItem key={tour._id} tour={tour} />
                          } else {
                            return false
                          }
                        })}
                    </ul>
                    {!scrolEnd2 && (
                      <button
                        className="next"
                        onClick={() => slide2(+500)}
                        onMouseEnter={(e) => anim(e)}
                        onMouseLeave={(e) => anim2(e)}
                      >
                        <i className="fa fa-angle-right"></i>
                      </button>
                    )}
                  </div>
                </div>


                {dataRecomendation &&
                  <>              

                   <div className="head_text_tours">Рекомендации  </div>
                   <div className="tourHistory"  > 
                    {
                       dataRecomendation && dataRecomendation.mostVisitTours.map((el, idx) => {
                        if (el.visitShema.tourId) {
                           if (idx < 5) {
                              return <CardItemRecomendation key={el.visitShema.tourId[0]._id} tour={el.visitShema.tourId[0]} counter={el.visitShema.counter} updatedAt={el.visitShema.updatedAt} />
                           } else {
                              return false
                           }
                        } else {
                          return false
                        }
                      })}
                  </div>

                  <div className="tourHistory"  > 
                    {
                       dataRecomendation && dataRecomendation.bestTourInMostVisitCountry.map((el, idx) => {
                        if (el) {
                            return <CardItemRecomendation key={el._id} tour={el}  />
                        } else {
                          return false
                        }
                      })}
                  </div>
                  </>
                  }


                  {dataHistory &&
                  <>              
                   <div className="head_text_tours">История просмотров</div>
                  <div className="tourHistory"  > 
                    {
                       dataHistory && dataHistory.map((el, idx) => {
                        if (el.visitShema.tourId[0] !== undefined) {
             
                            return <CardItemHistory key={el.visitShema.tourId[0]._id} tour={el.visitShema.tourId[0]} counter={el.visitShema.counter} updatedAt={el.visitShema.updatedAt} />
                        } else {
                          return false
                        }
                      })}
                  </div>
                  </>
                  }






              </>

            )
        }

      </div>
    </div>
  );
}

export default Cards;