import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='container__main'>
      <div className='cards'>

        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src='images/img-1.jpg'
                text='The Last Supper Painting Tour: Da Vinci in Depth. '
                label='label'
                path='/'
              />
              <CardItem
                src='images/img-2.jpg'
                text='Luxury Lake Como: Private Boat Excursion'
                label='label'
                path='/'
              />
            </ul>
            <ul className='cards__items'>
              <CardItem
                src='images/img-3.jpg'
                text='Alta Moda: Fashion In Milan'
                label='label'
                path='/'
              />
              <CardItem
                src='images/img-4.jpg'
                text='The Last Supper Painting Tour: Da Vinci in Depth'
                label='label'
                path='/'
              />
              <CardItem
                src='images/img-5.jpg'
                text='Ride through the Sahara Desert on a guided camel tour'
                label='label'
                path='/'
              />
              <CardItem
                src='images/img-6.jpg'
                text='Luxury Lake Como: Private Boat Excursion'
                label='label'
                path='/'
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;