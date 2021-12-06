import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { detailsTour, commentCreate } from "../redux/actions/tourActions";
import DatePicker from "react-datepicker";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import '../components/MainSection.css';
import { TOUR_COMMENT_CREATE_RESET } from '../redux/constants/tourConstants'
import { Link } from 'react-router-dom';

function Tour(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const tourId = props.match.params.id
  const dispatch = useDispatch()
  const tourDetails = useSelector(state => state.tourDetails)
  const { loading, error, tour } = tourDetails

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const tourCommentCreate = useSelector((state) => state.tourCommentCreate);
  const { loading: loadingCommentCreate, error: errorCommentCreate, success: successCommentCreate, } = tourCommentCreate;


  useEffect(() => {
    if (successCommentCreate) {
      window.alert('Comment Submitted Successfully');
      /*       setRating('');
            setComment(''); */
      dispatch({ type: TOUR_COMMENT_CREATE_RESET });
    }
    dispatch(detailsTour(tourId))
  }, [dispatch, successCommentCreate, tourId])

  const addToCartHandler = () => {
    props.history.push(`/cart/${tourId}?startDate=${startDate}&endDate=${endDate}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        commentCreate(tourId, { comment, user: userInfo._id })
      );
    } else {
      alert('Please enter comment');
    }
  };

  return (
    <>
      {loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<div class="message_box_tour"><MessageBox variant="danger">{error}</MessageBox></div>)
          : (
            <>
              <div className='grid'>
                <div className='grid__section'>
                  <div className='grid__content__container'>
                    <div className='grid__content'>
                      <h1 className='text-center'>
                        {tour.title}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='grid__section '>
                  <div className='grid__wrap'>
                    <button className='grid__gallery-button' >
                      <img alt="" className="grid__image" src={tour.image} />
                    </button>
                  </div>
                </div>

              </div>

              <section className="main-section">
                <div className="main-container">
                  <div className="grid-section">
                    <div className="grid-sidebar">
                      <div className='head-text'>
                        Book a Tour
                      </div>
                      <div className="grid-with-sidebar">
                        <DatePicker
                          selected={startDate}
                          onChange={onChange}
                          startDate={startDate}
                          endDate={endDate}
                          selectsRange
                          inline
                        />
                        <input type="submit" value="See Available Tours" class="action-button-tour" />
                        <input onClick={addToCartHandler} type="submit" value="Add tour to cart" class="action-button-tour" />
                        {/* <button className="primary block">Add to Cart</button> */}
                      </div>
                    </div>
                    <div>

                    </div>

                    <div className="grid-main-column">
                      <div className='head-text'>
                        Tour Details
                      </div>
                      <div className="box">
                        <div className="box-head">
                          Tour description
                        </div>
                        <div className="box-body">
                          {tour.desc}
                        </div>
                      </div>
                    





                      <div className='head-text'>
                        Comments
                      </div>
                      <div className="box">
                        <h2 className="box-head">Comments</h2>
                        {tour.comments.length === 0 && (
                          <MessageBox>There is no comment</MessageBox>
                        )}
                        <ul>
                          {tour.comments.map((comment) => (
                            <li key={comment._id}>
                              <strong>{comment.user}</strong>
                              {/*                      <Rating rating={review.rating} caption=" "></Rating> */}
                              <p>{comment.createdAt.substring(0, 10)}</p>
                              <p>{comment.comment}</p>
                            </li>
                          ))}
                        </ul>
                      </div>



                      <div className='head-text'>
                        Comments
                      </div>
                      <div className="box">
                        <div>

                          <ul>
                            <li>
                              {userInfo ? (
                                <form className="form" onSubmit={submitHandler}>
                                  <div className="box-head">
                                     Write a comment
                                  </div>
                                  <div>
                                    <label htmlFor="rating">Rating</label>
                                    <select
                                      id="rating"
                                      value={rating}
                                      onChange={(e) => setRating(e.target.value)}
                                    >
                                      <option value="">Select...</option>
                                      <option value="1">1- Poor</option>
                                      <option value="2">2- Fair</option>
                                      <option value="3">3- Good</option>
                                      <option value="4">4- Very good</option>
                                      <option value="5">5- Excelent</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="comment">Comment</label>
                                    <textarea
                                      id="comment"
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                  </div>
                                  <div>
                                    <label />
                                    <button className="action-button-tour" type="submit">
                                      Submit
                                    </button>
                                  </div>
                                  <div>
                                    {loadingCommentCreate && <LoadingBox></LoadingBox>}
                                    {errorCommentCreate && (
                                      <MessageBox variant="danger">
                                        {errorCommentCreate}
                                      </MessageBox>
                                    )}
                                  </div>
                                </form>
                              ) : (
                                <MessageBox>
                                  Please <Link to="/signin">Sign In</Link> to write a review
                                </MessageBox>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>














                    </div>
                  </div>
                </div>
              </section>

            </>
          )
      }
    </>
  )
}

export default Tour