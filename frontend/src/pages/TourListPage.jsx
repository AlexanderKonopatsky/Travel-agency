import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { listTour, createTour, deleteTour } from '../redux/actions/tourActions'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'
import { TOUR_CREATE_RESET } from "../redux/constants/tourConstants"
import { TOUR_DELETE_RESET } from "../redux/constants/tourConstants"

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

  const tourDelete = useSelector(state => state.tourDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = tourDelete

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TOUR_CREATE_RESET })
      props.history.push(`/tour/${createdTour._id}/edit`)
    }
    if (successDelete) {
      dispatch({ type: TOUR_DELETE_RESET })
    }
    dispatch(listTour())
  }, [createdTour, dispatch, props.history, successCreate, successDelete])

  const createHandler = () => {
    dispatch(createTour())
  }

  const deleteHandler = (tour) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteTour(tour._id))
    }
  }
  return (

    <div className="tourList">
      <h1>Tours</h1>
      <div className="row">

        <button type="button" className="primary" onClick={createHandler}>
          Create Tour
        </button>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
              <th>Buttons</th>
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
                    className="btn_details_admin"
                    onClick={() =>
                      props.history.push(`/tour/${tour._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn_details_admin"
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