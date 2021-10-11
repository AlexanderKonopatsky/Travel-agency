/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>


        <Link className='cards__item__link' to={props.path}>

          <div class='tour-card__favorite'>
            <button aria-label='Add to favorites' class='favorite-toggle' data-add-favorite-url='/account/favorites' data-favorite-toggle >
              <i class="far fa-heart"></i>
            </button>
          </div>

          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className="cards_cont">
            {/* <div className='cards__item__info'> */}
            <h3 className='cards__item__text'>{props.text}</h3>
            {/*      </div> */}
            <p className="tour_card_description">{props.desc}</p>

            <div class='rating'>
              <span class='star-rating'>
                <i class='fa fa-star'></i>
                <i class='fa fa-star'></i>
                <i class='fa fa-star'></i>
                <i class='fa fa-star'></i>
                <i class='fa fa-star'></i>
                <span class='star-rating__count'>
                  (173)
                </span>
              </span>
            </div>
          </div>

          <div>
            <div class='tour-card__details'>
              <div class='tour-detail'>
                <div class='tour-detail__text'>
                  $305
                </div>
                <span class='label'>
                  Price Tour
                </span>
              </div>
              <div class='tour-detail'>
                <div class='tour-detail__text'>
                  Dop info
                </div>
                <span class='label'>

                </span>
              </div>
              {/*<div class='tour-card__cta action-button'>
                Book now
              </div> */}
            </div>

          </div>



        </Link>
      </li>
    </>
  );
}

export default CardItem;