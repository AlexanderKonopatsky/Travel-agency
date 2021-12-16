import React from "react";
import * as BsIcons from 'react-icons/bs'

export default function Rating(props) {
  
  const { rating } = props

  const drawStars = () => {

    let content = [];
    for (let i = 1; i <= 5; i++) {
      content.push(
        <span>
          {
            rating >= i
              ?
              <BsIcons.BsStarFill />
              : rating >= i - 0.5
                ? <BsIcons.BsStarHalf />
                : <BsIcons.BsStar />
          }
        </span>
      );
    }
    return content;

  };

  return (

    <div className="rating star-rating">
      {drawStars()}
      <span></span>
    </div>

  )
}