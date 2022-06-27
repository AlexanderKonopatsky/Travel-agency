import React from 'react';
import Rating from './rating';
import { Link } from 'react-router-dom';

function CardItem(props) {

  const { tour, currentId } = props

  return (  
    <>
         <li key={tour._id} className='cards__item'>

         <Link className='cards__item__link' to={{pathname : `/tour/${tour._id}`}}>
          
            <figure className='cards__item__pic-wrap' data-category={tour.label}>
              <img
                className='cards__item__img'
                alt='Travel'
                src={tour.image}
              />
            </figure>
            <div className="cards_cont">
              <h3 className='cards__item__text'>{tour.title} </h3>
              <p className="tour_card_description">{tour.desc}</p>
              <span><Rating rating={tour.rating} numReviews={tour.numReviews} /> Комментарии {tour.numReviews}</span>
            </div>

            <div>
              <div className='tour-card__details'>
                <div className='tour-detail'>
                  <div className='tour-detail__text'>
                    ${tour.price}
                  </div>
                  <span className='label'>
                    Цена тура
                  </span>
                </div>
                <div className='tour-detail'>
                  <div className='tour-detail__text'>
                    Доп. инфо.
                  </div>
                  <span className='label'>
                  </span>
                </div>

              </div>
            </div>
          </Link>

        </li>
    </>
  );
}

export default CardItem;

