import React, { useState, useEffect} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from 'axios'
import MessageBox from './MessageBox'
import LoadingBox from './LoadingBox'
import { useDispatch, useSelector } from 'react-redux';
import { listTour } from '../redux/actions/tourActions'


function Cards() {
  const dispatch = useDispatch()
  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours } = tourList

  useEffect (() => {
    dispatch(listTour())
  }, [dispatch])

  return (
    <div className='container__main'>
      <div className='cards'>

        {loading? ( <LoadingBox></LoadingBox> )
         :
         error? ( <MessageBox variant="danger">{error}</MessageBox> ) 
         : (
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
              {
                tours.map(tour =>(
                  <CardItem key={tour._id} tour={tour}/>
                ))
              }
              </ul>
            </div>
          </div>
         )
      }
        
      </div>
    </div>
  );
}

export default Cards;