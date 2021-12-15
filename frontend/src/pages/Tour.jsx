import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { detailsTour, commentCreate, commentDelete } from "../redux/actions/tourActions";
import DatePicker from "react-datepicker";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import '../components/MainSection.css';
import { TOUR_COMMENT_CREATE_RESET } from '../redux/constants/tourConstants'
import { Link } from 'react-router-dom';
import Axios from "axios"
import Rating from '../components/rating'
import { commentUpdateStatus } from '../redux/actions/tourActions'
import { SliderData } from '../components/SliderData';
import ImageSlider from "../components/ImageSlider"

function Tour(props) {
  const dispatch = useDispatch()
  const tourId = props.match.params.id

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate() + 14));
  const [rating, setRating] = useState(0);
  const [updateRating, setUpdateRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState('');
  const [commentsCreated, setCommentsCreated] = useState(false);
  const [deletedComment, setDeletedComment] = useState([])
  let [numComments, setNumComments] = useState('')

  const tourDetails = useSelector(state => state.tourDetails)
  const { loading, error, tour } = tourDetails

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const tourCommentCreate = useSelector((state) => state.tourCommentCreate);
  const { loading: loadingCommentCreate, error: errorCommentCreate, success: successCommentCreate, } = tourCommentCreate;


  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  const getComments = async (tourId) => {
    const tourInfo = await Axios.get(`/api/tours/${tourId}`)
    setComments(tourInfo.data.comments.reverse())
    setUpdateRating(tourInfo.data.rating)
    setNumComments(tourInfo.data.numReviews)
    /*  setComments(data.data.reverse()) */
  }

  const addToCartHandler = () => {
    props.history.push(`/cart/${tourId}?startDate=${startDate}&endDate=${endDate}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        commentCreate(tourId, { comment, rating, user: userInfo._id })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const submitUpdateStatusComment = async (commentId, status) => {
    await dispatch(commentUpdateStatus(commentId, tourId, status))
    getComments(tourId)
  }

  const submitDeleteComment = (commentId) => {
    dispatch(commentDelete(commentId, tourId))
    setDeletedComment(arr => [...deletedComment, commentId])
    let countActiveComments = numComments - 1
    setNumComments(countActiveComments)
  }


  useEffect(() => {
    dispatch(detailsTour(tourId))
    getComments(tourId)
  }, [dispatch, tourId])

  useEffect(() => {
    if (successCommentCreate) {
      setRating('');
      setComment('');
      dispatch({ type: TOUR_COMMENT_CREATE_RESET });
      getComments(tourId)
      setCommentsCreated(true)
    }
  }, [dispatch, successCommentCreate, tourId])










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
                      <br />  <br />
                      <div className="text-divider__divider"></div>
                      <br />
                      <h3 className='text-center2'>
                        {tour.desc}
                      </h3>
                      <br />
                      <div className="text-divider__divider"></div>
                      <br />
                      <h2 className='text-center2'>
                        <Rating rating={updateRating && updateRating} numReviews={updateRating && updateRating} />
                      </h2>

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
                {/*         <input type="submit" value="See Available Tours" class="action-button-tour" /> */}
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
                          {tour.additionalInfo}
          

                        </div>

                        <div className="box-head">
                          Tour category - {tour.categoryS.categoryName}
                        </div>
                        <div className="box-body">
                          {tour.categoryS.categoryDesc}
                          <ImageSlider slides={tour.imageGallery} />
                        </div>
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

                                  {commentsCreated && (
                                    <MessageBox variant="success">
                                      Comment Submitted Successfully
                                    </MessageBox>
                                  )}
                                  {errorCommentCreate && (
                                    <MessageBox variant="danger">
                                      {errorCommentCreate}
                                    </MessageBox>
                                  )}
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

                                    <button className="action-button-tour" type="submit">
                                      Submit
                                    </button>
                                  </div>
                                  <div>
                                    {loadingCommentCreate && <LoadingBox></LoadingBox>}

                                  </div>
                                </form>
                              ) : (
                                <MessageBox>
                                  Please <Link to="/signUp">Sign In</Link> to write a comment
                                </MessageBox>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>







                      <div className='head-text'>
                        Comments
                      </div>
                      <div className="box">
                        <h2 className="box-head">Comments {numComments && ' - total ' + numComments}</h2>
                        {comments.length === 0 && (
                          <MessageBox>There is no comment</MessageBox>
                        )}
                        <ul>

                          {comments && comments.filter(row => !deletedComment.includes(row._id) && (row.isActive)).map(comment => (
                            /*           {comments && comments.map((comment) => ( */
                            <li key={comment._id}>
                              <div className="card__name">{comment.user.firstName} {comment.user.lastName}


                              </div>
                              <p>Comment: {comment.comment}</p>
                              {/*                      <Rating rating={review.rating} caption=" "></Rating> */}
                              <p>Status: {comment.isActive.toString()}</p>
                              <p>{comment.createdAt.substring(0, 10)}
                                <Rating rating={comment.rating} numReviews={comment.rating} />
                              </p>
                              {userInfo && userInfo.isAdmin &&
                                <div className="btn-remove-comment">
                                  <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'disable')}>disable</button>
                                  <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'enable')}>enable</button>
                                  <button className="btn-remove" type="button" onClick={(e) => submitDeleteComment(comment._id)}>delete</button>
                                </div>
                              }

                              <div className="text-divider__divider"></div>
                              <br />
                            </li>
                          ))}
                        </ul>
                      </div>










                      {userInfo && userInfo.isAdmin && <>
                        <div className='head-text'>
                          Disabled comments
                        </div>
                        <div className="box">
                          <h2 className="box-head">Disabled comments  </h2>
                          {comments.length === 0 && (
                            <MessageBox>There is no comment</MessageBox>
                          )}
                          <ul>

                            {comments && comments.filter(row => !deletedComment.includes(row._id) && (!row.isActive)).map(comment => (
                              /*           {comments && comments.map((comment) => ( */
                              <li key={comment._id}>
                                <div className="card__name">{comment.user.firstName} {comment.user.lastName}


                                </div>
                                <p>Comment: {comment.comment}</p>
                                {/*                      <Rating rating={review.rating} caption=" "></Rating> */}
                                <p>Status: {comment.isActive.toString()}</p>
                                <p>{comment.createdAt.substring(0, 10)}
                                  <Rating rating={comment.rating} numReviews={comment.rating} />
                                </p>
                                {userInfo && userInfo.isAdmin &&
                                  <div className="btn-remove-comment">
                                    <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'disable')}>disable</button>
                                    <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'enable')}>enable</button>
                                    <button className="btn-remove" type="button" onClick={(e) => submitDeleteComment(comment._id)}>delete</button>
                                  </div>
                                }

                                <div className="text-divider__divider"></div>
                                <br />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>}











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