import React from 'react';
import Rating from './rating';
import { Link } from 'react-router-dom';

function CardItemHistory(props) {

   const { tour, currentId, counter, updatedAt } = props

   return (
      <>
         <div key={tour._id} className='history__cards__item'>

            <div className='cards__item__link' to={{ pathname: `/tour/${tour._id}` }}>

  

               <figure className='cards__item__pic-wrap' data-category={tour.title}>
                  <img
                     className='cards__item__img'
                     alt='Travel'
                     src={tour.image}
                  />
               </figure>
{/*                <div className="cards_cont">

  
                  <h3 className='cards__item__text'>{updatedAt} последний раз </h3>
                  <h3 className='cards__item__text'>{counter} посещений </h3>

               </div> */}


            </div>

         </div>




      </>
   );
}

export default CardItemHistory

