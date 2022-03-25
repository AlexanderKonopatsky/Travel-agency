import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { listOrder } from "../redux/actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'
import { detailsUser, updateUserProfile } from "../redux/actions/userActions";
import '../components/Profile.css'
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import Axios from "axios"

function Profile(props) {

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')
  const [image, setImage] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(detailsUser(userInfo._id))
    } else {
      setFirstName(firstName || user.firstName)
      setLastName(lastName || user.lastName)
      setEmail(email || user.email)
    }
  }, [dispatch, userInfo, user, firstName, lastName, email])

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not matched')
    } else {
      dispatch(updateUserProfile({
        _id: user._id,
        firstName,
        lastName,
        email,
        image
      }))
    }
  }


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const bodyFromData = new FormData()
    bodyFromData.append('image', file)
    setLoadingUpload(true)
    try {
      let { data } = await Axios.post('/api/uploads', bodyFromData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      if (data[0] !== '\\') {
        data = '\\' + data
      }
      setImage(data)
      setLoadingUpload(false)
    } catch (error) {
      setErrorUpload(error.message)
      setLoadingUpload(false)
    }
  }

  return (
    <>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  Edit Profile
                </h1>
              </div>
            </div>
          </div>

          <div className="grid-cart-profile">
            <section className="grid-main-column-cart">
              <h1 className="head-text">Your Profile</h1>
              <div className="item-cart">

                <form className='form_for_new_user' onSubmit={submitHandler}>

                  {loading ? (
                    <LoadingBox></LoadingBox>
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <>
                      {loadingUpdate && <LoadingBox></LoadingBox>}
                      {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                      )}
                      {successUpdate && (
                        <MessageBox variant="success">
                          Profile Updated Successfully
                        </MessageBox>
                      )}
                      <div className='row1'>

                        <div className='form-box'>
                          <label className="form-box__field" >
                            <span className='form-label'>
                              First Name
                            </span>
                            <input className="form-input" value={firstName} onChange={e => setFirstName(e.target.value)} type="text" />
                          </label>
                        </div>

                        <div className='form-box'>
                          <label className="form-box__field" >
                            <span className='form-label'>
                              Latt Name
                            </span>
                            <input className="form-input" value={lastName} onChange={e => setLastName(e.target.value)} type="text" />
                          </label>
                        </div>

                        <div className='form-box'>
                          <label className="form-box__field" >
                            <span className='form-label'>
                              Email
                            </span>
                            <input className="form-input" value={email} type="email" onChange={e => setEmail(e.target.value)} />
                          </label>
                        </div>

                        <div className='form-box'>
                          <label className="form-box__field" >
                            <span className='form-label'>
                              Password
                            </span>
                            <input className="form-input" type="password" onChange={e => setPassword(e.target.value)} />
                          </label>
                        </div>

                        <div className='form-box'>
                          <label className="form-box__field" >
                            <span className='form-label'>
                              Confirm password
                            </span>
                            <input className="form-input" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                          </label>
                        </div>

                        <div className='form-box'>
                          <label className="form-box__field" >
                            <span className='form-label'>
                              Main Image
                            </span>
                            <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && (
                              <MessageBox variant="danger">{errorUpload}</MessageBox>
                            )}
                          </label>
                        </div>

                        <button className='btn_auth' type="submit" >
                          UPDATE
                        </button>
                      </div>
                    </>
                  )}
                </form>

              </div>


            </section>

            <section className="grid-checkout-column">
              <h1 className="head-text">Info </h1>
              <div className="item-checkout">
                <img src={userInfo && userInfo.imageProfile} alt="profile"></img>
              </div>

            </section>

            <div className='section_message'>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile