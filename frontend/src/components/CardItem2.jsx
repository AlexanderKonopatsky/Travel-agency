import React from 'react';
import Rating from './rating';

function CardItem(props) {

  const { tour, currentId } = props

  return (
    <>


      <li key={tour._id} className='cards__item'>

        <a className='cards__item__link' href={`tour/${tour._id}`}>
          <div className='tour-card__favorite'>
            <button aria-label='Add to favorites' className='favorite-toggle'>
              <i className="far fa-heart"></i>
            </button>
          </div>

          <figure className='cards__item__pic-wrap' data-category={tour.label}>
            <img
              className='cards__item__img'
              alt='Travel'
              src={tour.image}
            />
          </figure>
          
          <div className="cards_cont">
            <h3 className='cards__item__text'>{tour.title}</h3>
            <p className="tour_card_description">{tour.desc}</p>
            <Rating rating={tour.rating} numReviews={tour.numReviews} />
          </div>

          <div>
            <div className='tour-card__details'>
              <div className='tour-detail'>
                <div className='tour-detail__text'>
                  ${tour.price}
                </div>
                <span className='label'>
                  Price Tour
                </span>
              </div>
              <div className='tour-detail'>
                <div className='tour-detail__text'>
                  Dop info
                </div>
                <span className='label'>
                </span>
              </div>
            </div>
          </div>
        </a>

      </li>




    </>
  );
}

export default CardItem;

