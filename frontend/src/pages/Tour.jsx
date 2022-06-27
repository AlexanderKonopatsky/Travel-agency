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



function Tour(props) {
   const dispatch = useDispatch()
   const tourId = props.match.params.id
   const [availableSeats, setAvailableSeats] = useState('')
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date()/* new Date(new Date().setDate(new Date().getDate() + 7)) */);
   const [rating, setRating] = useState(0);
   const [emptyError, setEmptyError] = useState(false);
   const [emptyError2, setEmptyError2] = useState(false);
   const [updateRating, setUpdateRating] = useState(0);
   const [comment, setComment] = useState('');
   const [comments, setComments] = useState('');
   const [commentsCreated, setCommentsCreated] = useState(false);
   const [deletedComment, setDeletedComment] = useState([])
   const [arrayImageTour, setArrayImageTour] = useState([])
   const [centerMap, setCenterMap] = useState({})
   const [deletedSeats, setDeletedSeats] = useState([])
   const [availableSeatsCount, setAvailableSeatsCount] = useState()
   const [reservedSeatsCount, setReservedSeatsCount] = useState()
   const [currentIdSeats, setCurrentIdSeats] = useState()
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

      if (count > availableSeatsCount) {
         alert('Не достаточно свободных мест')

      } else {
         props.history.push(`/cart/${tourId}?idSeats=${currentIdSeats}&startDate=${startDate}&endDate=${endDate}&count=${count}`)
      }
  
   }

   const submitHandler = (e) => {
      e.preventDefault();
      if (comment && rating) {
         if (comment.length < 1000) {
            dispatch(
               commentCreate(tourId, { comment, rating, user: userInfo._id })
            );
         } else {
            setEmptyError2(true)
      
         }
         setEmptyError(false)
      } else {
         setEmptyError2(false)
         setEmptyError(true)
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


   const submitSelectHandler2 =  (availableSeats) => {
      setStartDate(new Date(availableSeats.startDate))
      setEndDate(new Date(availableSeats.endDate))
      setAvailableSeatsCount(availableSeats.availableSeats - availableSeats.reservedSeats)
      setReservedSeatsCount(availableSeats.reservedSeats)
      setCount(2)
      setCurrentIdSeats(availableSeats._id)
      console.log(startDate, endDate)

   }

   const getDataAvailableSeats = async () => {
      let availableSeats  = await Axios.get(`/api/tours/${tourId}/availableSeats`, /* { headers: { Authorization: `Bearer ${userInfo.token}` } } */)
      availableSeats = availableSeats.data.availableSeats
      console.log(availableSeats)
      setAvailableSeats(availableSeats) 
    }


   useEffect(() => {
      console.log('111111', tourId)
      dispatch(detailsTour(tourId))
      getComments(tourId)
      getDataAvailableSeats()
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


   const [count, setCount] = useState(2)

   const decrement = () => {
      if (count > 1) setCount(count - 1)
   }

   const increment = () => {
      if (count < availableSeatsCount) setCount(count + 1)
   }


   const getPointData = (index, title, desc, image) => {
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
                                    Добавить тур в корзину
                                 </div>
                                 <div className="grid-with-sidebar">
                                    <DatePicker
                                       selected={startDate}
                              
                                       startDate={startDate}
                                       endDate={endDate}
                                       selectsRange
                                       inline
                                    />

                             




                                    <div className="box-head">Количество человек</div>
                                    <div className="counterCartTour">
                                       <button onClick={decrement} className="form-incrementer__btn" data-decrement="" type="button">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="#1a1a1a">
                                             <g transform="translate(3.603 3)">
                                                <path d="M5.3,9h8.3v2H5.3V9z"></path>
                                             </g>
                                             <path
                                                d="M13,2c6.1,0,11,4.9,11,11s-4.9,11-11,11S2,19.1,2,13S6.9,2,13,2 M13,1C6.4,1,1,6.4,1,13s5.4,12,12,12s12-5.4,12-12   S19.6,1,13,1L13,1z">
                                             </path>
                                          </svg>

                                       </button>
                                       <input type="number" id="booking-pax" value={count}
                                          className="form-incrementer__input form-incrementer__input__booking" required="required"
                                          readOnly="readonly" />
                                       <button onClick={increment} className="form-incrementer__btn" data-increment="" type="button">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 26 26" fill="#1a1a1a">
                                             <path
                                                d="M13,2c6.1,0,11,4.9,11,11s-4.9,11-11,11S2,19.1,2,13S6.9,2,13,2 M13,1C6.4,1,1,6.4,1,13s5.4,12,12,12s12-5.4,12-12   S19.6,1,13,1L13,1z">
                                             </path>
                                             <g transform="translate(4 3)">
                                                <path className="st1" d="M8,9V4.8H10V9h4.2V11H10v4.2H8V11H3.8V9H8z"></path>
                                             </g>
                                          </svg>

                                       </button>
                                    </div>

                                    <input onClick={addToCartHandler} type="submit" value="Добавить в корзину" class="action-button-tour" />
                                 </div>
                              </div>
                              <div>

                              </div>

                              <div className="grid-main-column">
                                 <div className='head-text'>
                                    Детали тура
                                 </div>
                                 <div className="box">

                                    <div className="box-head">
                                    Описание тура
                                    </div>
                                    <div className="box-body">
                                       {tour.desc}
                                       {tour.additionalInfo}


                                    </div>

                                    <div className="box-head">
                                      Категория тура  - {tour.categoryS.categoryName}
                                    </div>

                         
                                   

<YMaps query={{ apikey: process.env.REACT_APP_API_KEY_YANDEX_MAPS }}>
   <Map width='100%' height='500px' state={centerMap && centerMap}>
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
      <FullscreenControl />
      <GeolocationControl options={{ float: 'left' }} />
      <TypeSelector options={{ float: 'right' }} />
      <ZoomControl options={{ float: 'right' }} />
   </Map>
</YMaps>
       




                                    <ImageGallery items={arrayImageTour} />

                                    <div className="box-head">
                                       Доступные даты
                                    </div>        

                                    <table className="table">
                           <thead>
                              <tr>
                                 <th>Дата начала</th>
                                 <th>Дата окончания </th>
                                 <th>Кол-во занятых мест </th>
                                 <th>Кнопка</th>
                              </tr>
                           </thead>
                           <tbody>
                           {availableSeats && availableSeats.availableSeats.filter(row => !deletedSeats.includes(row._id)).map(a => (
                   
                           <tr key={a._id}>
                              <td>{String(a.startDate).slice(0, 10)}</td>
                              <td>{String(a.endDate).slice(0, 10)}</td>
{/*                               <td>{(!isNaN(a.availableSeats - a.reservedSeats)) ? a.availableSeats - a.reservedSeats : a.availableSeats } из {a.availableSeats}</td> */}
<td>{ a.reservedSeats  } из {a.availableSeats}</td> 
                           <td>
                              <button className="action-button-tour" type="button" onClick={(e) => submitSelectHandler2(a)}>Выбрать</button>
                              
                           </td>
                        </tr>
                        ))}
                        </tbody>
                        </table>




                                 </div>










                                 <div className='head-text'>
                                    Добавьте комментарий
                                 </div>
                                 <div className="box">
                                    <div>

                                       <ul>
                                          <li>
                                             {userInfo ? (
                                                <form className="form" onSubmit={submitHandler}>
                                                   <div className="box-head">
                                                      Напишите комментарий
                                                   </div>
                                                   
                                                   {emptyError && <MessageBox variant="danger">Пожалуйста напишите комментарий и поставьте оценку туру.</MessageBox>}
                                                   {emptyError2 && <MessageBox variant="danger">Длина комментария должна быть не более 1000 символов.</MessageBox>}
                                                   {commentsCreated && (
                                                      <MessageBox variant="success">
                                                         Комментарий успешно добавлен
                                                      </MessageBox>
                                                   )}
                                                   {errorCommentCreate && (
                                                      <MessageBox variant="danger">
                                                         {errorCommentCreate}
                                                      </MessageBox>
                                                   )}
                                                   <div>
                                                      <label htmlFor="rating">Оценка</label>
                                                      <select
                                                         id="rating"
                                                         value={rating}
                                                         onChange={(e) => setRating(e.target.value)}
                                                      >
                                                         <option value="">Выберите...</option>
                                                         <option value="1">1- Бедно</option>
                                                         <option value="2">2- Плохо</option>
                                                         <option value="3">3- Нормально</option>
                                                         <option value="4">4- Очень хорошо</option>
                                                         <option value="5">5- Великолепно</option>
                                                      </select>
                                                   </div>
                                                   <div>
                                                      <label htmlFor="comment">Комментарий</label>
                                                      <textarea
                                                         id="comment"
                                                         value={comment}
                                                         onChange={(e) => setComment(e.target.value)}
                                                      ></textarea>
                                                   </div>
                                                   <div>

                                                      <button className="action-button-tour" type="submit">
                                                         Отправить
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
                                   На модерации
                                 </div>
                                 <div className="box">
                                    {comments.length === 0 && (
                                       <MessageBox>There is no comment</MessageBox>
                                    )}
                              
                                    <ul>

                                       {userInfo && comments && comments.filter(row => !deletedComment.includes(row._id) && (row.user._id === userInfo._id ) && (!row.isActive)).map(comment => (

                                          <li key={comment._id}>
                                             <div className="card__name">{comment.user.firstName} {comment.user.lastName}


                                             </div>
                                             <p>Comment: {comment.comment}</p>

                                             <p>Status: {!comment.isActive ? <p> На модерации</p> : <p>True</p>}</p>
                                             <p>{comment.createdAt.substring(0, 10)}
                                                <Rating rating={comment.rating} numReviews={comment.rating} />
                                             </p>
                                             {userInfo && userInfo.isAdmin &&
                                                <div className="btn-remove-comment">
                                                   <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'disable')}>Отключить</button> 
                                                   <button className="btn-remove" type="button" onClick={(e) => submitDeleteComment(comment._id)}>Удалить</button>
                                                </div>
                                             }

                                             <div className="text-divider__divider"></div>
                                             <br />
                                          </li>
                                       ))}
                                    </ul>
                                 </div>



                                 <div className='head-text'>
                                    Комментарии
                                 </div>
                                 <div className="box">
                                    <h2 className="box-head">Комментарии {/* {numComments && ' - total ' + numComments} */}</h2>
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
                                                   <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'disable')}>Отключить</button>
                                                   {/*     <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'enable')}>enable</button> */}
                                                   <button className="btn-remove" type="button" onClick={(e) => submitDeleteComment(comment._id)}>Удалить</button>
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
                                       Отключенные комментарии
                                    </div>
                                    <div className="box">
                        {/*                <h2 className="box-head">Disabled comments  </h2> */}
                                       {comments.length === 0 && (
                                          <MessageBox>Нет комментарий</MessageBox>
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
                                                      <button className="btn-remove" type="button" onClick={(e) => submitUpdateStatusComment(comment._id, 'enable')}>Одобрить</button>
                                                      <button className="btn-remove" type="button" onClick={(e) => submitDeleteComment(comment._id)}>Удалить</button>
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