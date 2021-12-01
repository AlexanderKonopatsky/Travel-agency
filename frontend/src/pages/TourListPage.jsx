import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { listTour, createTour } from '../redux/actions/tourActions'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'
import { TOUR_CREATE_RESET } from "../redux/constants/tourConstants"

function TourListScreen(props) {



  const tourCreate = useSelector(state => state.tourCreate)
  const { 
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    tour: createdTour,
  } = tourCreate

  const dispatch = useDispatch()
  const tourList = useSelector(state => state.tourList)
  const { loading, error, tours } = tourList

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TOUR_CREATE_RESET })
      console.log('------------------------')
      console.log(createdTour, successCreate)
      console.log('------------------------')
      props.history.push(`/tour/${createdTour._id}/edit`)
    }
    dispatch(listTour())
  }, [createdTour, dispatch, props.history, successCreate])

  const deleteHandler = () => {
    /// TODO: dispatch delete action
  };

  const createHandler = () => {
    dispatch(createTour())
  } 
  return (

    <div className="tourList">
      <h1>Tours</h1>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>category</th>

              <th>label</th>
              <th>desc</th>
              <th>dop info</th>
              <th>price</th>
              <th>rating</th>
              <th>numReviews</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id}>
                <td>{tour._id}</td>
                <td>{tour.title}</td>
                <td>{tour.category}</td>
                <td>{tour.label}</td>
                <td>{tour.desc}</td>
                <td>{tour.additionalInfo}</td>
                <td>{tour.price}</td>
                <td>{tour.rating}</td>
                <td>{tour.numReviews}</td>
                <td>{tour.createdAt}</td>
                <td>{tour.updatedAt}</td>
                <td>
                  <button
                    type="button"
                    className="btn_details_order"
                    onClick={() =>
                      props.history.push(`/tour/${tour._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn_details_order"
                    onClick={() => deleteHandler(tour)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  )
}

export default TourListScreen