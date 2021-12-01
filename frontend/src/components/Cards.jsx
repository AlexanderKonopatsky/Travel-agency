import React, { useState, useEffect, useRef } from 'react';
import './Cards.css';
import CardItem from './CardItem';

import MessageBox from './MessageBox'
import LoadingBox from './LoadingBox'
import { useDispatch, useSelector } from 'react-redux';
import { listTour } from '../redux/actions/tourActions'
import HorizontalScroll from 'react-scroll-horizontal'
import { gsap } from "gsap";




function Cards() {
  const dispatch = useDispatch()
  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours } = tourList

  const [scrollX1, setscrollX1] = useState(0);
  const [scrolEnd1, setscrolEnd1] = useState(false);

  const [scrollX2, setscrollX2] = useState(0);
  const [scrolEnd2, setscrolEnd2] = useState(false);
  //---------------------------

  let scrl = useRef(null);
  let scrl2 = useRef(null);


  useEffect(() => {
    dispatch(listTour())
  }, [dispatch])


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
                  <div className="head_text_tours">Best in Belarus</div>

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
                      {
                        tours.map(tour => (
                          <CardItem key={tour._id} tour={tour} />
                        ))
                      }
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
                  <div className="head_text_tours">Best in Russia</div>

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
                        tours.map(tour => (
                          <CardItem key={tour._id} tour={tour} />
                        ))
                      }
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
              </>

            )
        }

      </div>
    </div>
  );
}

export default Cards;