import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsTour, updateTour } from "../redux/actions/tourActions";
import { TOUR_UPDATE_RESET } from "../redux/constants/tourConstants"
import Axios from "axios"


function TourEditPage(props) {
  const tourId = props.match.params.id
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [label, setLabel] = useState('')
  const [desc, setDesc] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const uploadFileHandler = async (e) => {
    console.log('--------------')
    console.log(e.target.files[0])
    const file = e.target.files[0]
    const bodyFromData = new FormData()
    bodyFromData.append('image', file)
    setLoadingUpload(true)
    try {
      const { data } = await Axios.post('/api/uploads', bodyFromData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      setImage(data)
      setLoadingUpload(false)
    } catch (error) {
      setErrorUpload(error.message)
      setLoadingUpload(false)
    }
  }


  const dispatch = useDispatch()

  const tourUpdate = useSelector(state => state.tourUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success } = tourUpdate

  const tourDetails = useSelector(state => state.tourDetails)
  const { loading: loadingDetails, error: errorDetails, tour } = tourDetails

  useEffect(() => {
    if (success) {
      /*       props.history.push('/tourlist') */
    }
    if (!tour || tour._id !== tourId) {
      dispatch({ type: TOUR_UPDATE_RESET })
      dispatch(detailsTour(tourId))
    } else {
      setTitle(tour.title)
      setPrice(tour.price)
      setImage(tour.image)
      setCategory(tour.category)
      setLabel(tour.label)
      setDesc(tour.desc)
      setAdditionalInfo(tour.additionalInfo)
    }
  }, [dispatch, props.history, success, tour, tourId])




  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTour({
        _id: tourId,
        title, price, image, category, label, desc, additionalInfo
      })
    )
  }

  const backHandler = () => {
    props.history.push('/tourlist')
  }


  return (
    <div>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  Edit Tour
                </h1>

              </div>
            </div>
          </div>

          <section className="grid-main-column-tour">
            <h1 className="head-text">Edit form</h1>
            <div className="item-tour">

              <form className='form_for_new_user' onSubmit={submitHandler}>

                {loadingDetails ? (
                  <LoadingBox></LoadingBox>
                ) : errorDetails ? (
                  <MessageBox variant="danger">{errorDetails}</MessageBox>
                ) : (
                  <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                      <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {success && (
                      <MessageBox variant="success">
                        Tour Updated Successfully
                      </MessageBox>
                    )}
                    <div className='row'>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Title
                          </span>
                          <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Price
                          </span>
                          <input className="form-input" value={price} onChange={e => setPrice(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Image
                          </span>
                          <input className="form-input"  type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Category
                          </span>
                          <input className="form-input" value={category} type="text" onChange={e => setCategory(e.target.value)} />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Label
                          </span>
                          <input className="form-input" value={label} type="text" onChange={e => setLabel(e.target.value)} />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Description
                          </span>
                          <input className="form-input" value={desc} type="text" onChange={e => setDesc(e.target.value)} />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            additionalInfo
                          </span>
                          <textarea className="form-input" value={additionalInfo} type="text" onChange={e => setAdditionalInfo(e.target.value)} ></textarea>
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        UPDATE
                      </button>
                      <button className='btn_auth' type="submit" onClick={backHandler} >
                        RETURN TO THE LIST OF TOURS
                      </button>
                    </div>
                  </>
                )}
              </form>

            </div>


          </section>




        </div>
      </div>






    </div>
  )
}

export default TourEditPage