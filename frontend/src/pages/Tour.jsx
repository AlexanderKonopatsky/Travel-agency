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
import { YMaps, Map, Clusterer, Placemark, FullscreenControl, GeolocationControl, TypeSelector, ZoomControl, ListBox, ListBoxItem } from 'react-yandex-maps';
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css'

import ImageGallery from 'react-image-gallery'
import env from "dotenv"
env.config()


const images = [
   {
      original: '/uploads/1639558192839.jpg',
      thumbnail: 'https://picsum.photos/id/1018/1000/600/',
   },
   {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/1000/600/',
   },
   {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
   },
];


const cities = [
   {
      data: { content: 'Saint-Petersburg' },
      options: { selectOnClick: false },
      coords: [59.93863, 30.31413],
   },
   {
      data: { content: 'Dzerzhinsky' },
      options: { selectOnClick: false },
      coords: [55.630527, 37.849046],
   },
   {
      data: { content: 'Moscow' },
      options: { selectOnClick: false },
      coords: [55.753559, 37.609218],
   },
];


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
   const [arrayImageTour, setArrayImageTour] = useState([])
   const [centerMap, setCenterMap] = useState({})
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

   const onItemClick = coords => {
      setCenterMap({ center: coords });
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
         if (comment.length < 5000) {
            dispatch(
               commentCreate(tourId, { comment, rating, user: userInfo._id })
            );
         } else {
            alert('Comment length cannot exceed 5000 characters');
         }

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
      let newA = []
      if (tour) {
         tour.imageGallery.forEach(e => { let obj = { original: e, thumbnail: e }; newA.push(obj) })
         setArrayImageTour(newA)
         let objState = {
            center: [tour.cityT.lat, tour.cityT.lon],
            zoom: 10,
            behaviors: ['default', 'scrollZoom']
         }
         setCenterMap(objState)
      }


   }, [dispatch, tour])



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





   const coordinates = [
      [55.851574, 37.873856],
      [55.651574, 37.773856],
      [55.551574, 37.673856],
      [55.451574, 37.273856],
      [55.351574, 37.373856],
      [55.2751574, 37.473856],
   ]

   const mapState = {
      center: [55.751574, 37.573856],
      zoom: 9,
      behaviors: ['default', 'scrollZoom'],
   };

   const getPointData = (index, title, desc, image)  => {
      return {
         balloonContentBody: [
            `<i>Название: ${title}</i>`,
            '<br/><br/>',
            `<strong>${desc}</strong>`,
            '<br/>',
            `<img alt="" className="grid__image" src=${image} />`,
            '<br/>',
         ].join(''),
         clusterCaption: 'placemark <strong>' + index + '</strong>',
      };
   };

   const getPointOptions = () => {
      return {
         preset: 'islands#blackIcon',
      };
   };




   return (
      <>
         {loading ? (<div className="loading"><LoadingBox></LoadingBox></div>)
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


                             
                               
                                    <YMaps query={{ apikey: process.env.REACT_APP_API_KEY_YANDEX_MAPS }}>
                                       <Map width='100%'
                                          height='500px' state={centerMap && centerMap}>
                                          <Clusterer
                                             options={{
                                                preset: 'islands#invertedVioletClusterIcons',
                                                groupByCoordinates: false,
                                                clusterDisableClickZoom: true,
                                                clusterHideIconOnBalloonOpen: false,
                                                geoObjectHideIconOnBalloonOpen: false,
                                             }}
                                          >
                                             {tour.attractions.map((a, idx) =>
                                                <Placemark
                                                   geometry={[a.lat, a.lon]}



                                                   key={idx}
                                                   options={getPointOptions()}
                                                   properties={getPointData(idx, a.titleAttraction, a.descAttraction, a.imageAttraction)}



                                          

                                                   
                                                   modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                                />)

                                             }
                                          </Clusterer>
                                          <ListBox data={{ content: 'Choose city' }} options={{ float: 'right' }}>
                                             {cities.map(city =>
                                                <ListBoxItem
                                                   data={city.data}
                                                   options={city.options}
                                                   onClick={() => onItemClick(city.coords)}
                                                   key={city.data.content}
                                                />
                                             )}
                                          </ListBox>
                                          <FullscreenControl />
                                          <GeolocationControl options={{ float: 'left' }} />
                                          <TypeSelector options={{ float: 'right' }} />
                                          <ZoomControl options={{ float: 'right' }} />
                                       </Map>
                                    </YMaps>
                                    {/*<YMaps query={{ apikey: process.env.REACT_APP_API_KEY_YANDEX_MAPS }}>
                                       <Panorama defaultPoint={[55.733685, 37.588264]} />
                                    </YMaps> */}




                                    <ImageGallery items={arrayImageTour} />








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
                                                   {/*     <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'enable')}>enable</button> */}
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
                                                      {/*  <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'disable')}>disable</button> */}
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