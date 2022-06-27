import React from 'react';
import Rating from './rating';
import { Link } from 'react-router-dom';

function CardItemRecomendation(props) {

   const { tour, currentId, counter, updatedAt } = props

   return (
      <>
         <div key={tour._id} className='recomendation__cards__item'>

            <Link className='cards__item__link' to={{ pathname: `/tour/${tour._id}` }}>
               <figure className='cards__item__pic-wrap' data-category={tour.title}>
                  <img
                     className='cards__item__img'
                     alt='Travel'
                     src={tour.image}
                  />
               </figure>
               <div className="cards_cont">
                  {counter &&
                     <h3 className='cards__item__text'>{counter} посещений </h3>
                  }
                  {!counter &&
                     <h3 className='cards__item__text'>Лучший тур в городе {tour.city} </h3>
                  }



               </div>


            </Link>

         </div>




      </>
   );
}

export default CardItemRecomendation

