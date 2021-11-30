import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { listTour } from '../redux/actions/tourActions'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'

function TourListScreen(props) {

  const dispatch = useDispatch()
  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours } = tourList

  useEffect(() => {
    dispatch(listTour())
  }, [dispatch])

  const deleteHandler = () => {
    /// TODO: dispatch delete action
  };

  return (

    <div className="tourList">
      <h1>Tours</h1>
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