import React, { useEffect } from 'react'
import { addToCart } from '../../redux/actions/cartActions'
import { useDispatch } from 'react-redux'


export default function CartPage(props) {
  const tourId = props.match.params.id
  const startDate = props.location.search.split('=')[1]

  const dispatch = useDispatch()
  useEffect(() => {
    if(tourId) {
      dispatch(addToCart(tourId))
    }
  }, [dispatch, tourId])

  return (
    <div>
      <h1>Cart Page</h1>
      <p>Add to cart : TourId: {tourId} startDate: ${startDate}</p>
    </div>
  )
}