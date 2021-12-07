import React from "react";
import * as BsIcons from 'react-icons/bs'

export default function Rating(props) {
  const { rating, numReviews } = props

  return (
    <div className="rating star-rating">
  
 
      
      <span>
        {
            rating >= 1
              ?    <BsIcons.BsStarFill />
              : rating >= 0.5
                ?      <BsIcons.BsStarHalf />
                : <BsIcons.BsStar />
          }

      </span>
      <span>
      {
            rating >= 2
              ?     <BsIcons.BsStarFill />
              : rating >= 1.5
                ?     <BsIcons.BsStarHalf />
                : <BsIcons.BsStar />
          }

      </span>
      <span>
{
            rating >= 3
              ?     <BsIcons.BsStarFill />
              : rating >= 2.5
                ?      <BsIcons.BsStarHalf />
                :<BsIcons.BsStar />
          }

      </span>
      <span>
{
            rating >= 4
              ?    <BsIcons.BsStarFill />
              : rating >= 3.5
                ?      <BsIcons.BsStarHalf />
                : <BsIcons.BsStar />
          }

      </span>
      <span>
{
            rating >= 5
              ? <BsIcons.BsStarFill />
              : rating >= 4.5
                ?      <BsIcons.BsStarHalf />
                :<BsIcons.BsStar />
          }

      </span>
      <span></span>
    </div>
  )
}