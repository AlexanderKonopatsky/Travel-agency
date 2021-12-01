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

  useEffect(() => {
    dispatch(listTour())
  }, [dispatch])




  //---------------------------
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
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

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
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
                {/*               <div className='cards__container'>
                <div className='cards__wrapper'>
                  <ul className='cards__items'>
                    {
                      tours.map(tour => (
                        <CardItem key={tour._id} tour={tour} />
                      ))
                    }
                  </ul>
                </div>
              </div> */}


{/*                 <div className="sroll-horizontal">
                  <HorizontalScroll>

                    {
                      tours.map(tour => (
                        <CardItem2 key={tour._id} tour={tour} />
                      ))
                    }

                  </HorizontalScroll>
                </div>
 */}


             

                <div className="scroll2">
                
                  {scrollX !== 0 && (
                    <button
                      className="prev"
                      onClick={() => slide(-500)}
                      onMouseEnter={(e) => anim(e)}
                      onMouseLeave={(e) => anim2(e)}
                    >
                      <i className="fa fa-angle-left"></i>
                    </button>
                  )}
                  <ul className="scroll_ul" ref={scrl} onScroll={scrollCheck}>
                    {
                      tours.map(tour => (
                        <CardItem key={tour._id} tour={tour} />
                      ))
                    }
                  </ul>
                  {!scrolEnd && (
                    <button
                      className="next"
                      onClick={() => slide(+500)}
                      onMouseEnter={(e) => anim(e)}
                      onMouseLeave={(e) => anim2(e)}
                    >
                      <i className="fa fa-angle-right"></i>
                    </button>
                  )}
                </div>

              </>

            )
        }

      </div>
    </div>
  );
}

export default Cards;