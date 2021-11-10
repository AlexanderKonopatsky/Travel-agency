import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { listOrder } from "../redux/actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'
import { detailsUser } from "../redux/actions/userActions";
import '../components/Profile.css'

function Profile(props) {

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id)) 
  }, [dispatch, userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
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
                <div className='row1'>
            

                 
            

                  
                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            First Name
                        </span>
                        <input className="form-input" onChange={ e => setFirstName(e.target.value)} type="text" required  />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Latt Name
                        </span>
                        <input className="form-input" onChange={ e => setLastName(e.target.value)} type="text" required  />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Email
                        </span>
                        <input className="form-input" type="email" onChange={ e => setEmail(e.target.value)} required  />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Password
                        </span>
                        <input className="form-input" type="password"  onChange={ e => setPassword(e.target.value)} required />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Confirm password
                        </span>
                        <input className="form-input" type="password" onChange={ e => setConfirmPassword(e.target.value)} required  />
                      </label>
                    </div>
                    
                    <button className='btn_auth'  type="submit" >
                      UPDATE
                    </button>
                </div>
              </form>

                    </div>


          </section>

          <section className="grid-checkout-column">
            <h1 className="head-text">Info </h1>
            <div className="item-checkout">
            Curiosity is contagious — get rewarded for sharing some. Send the code below to a friend, and when they book, you'll receive a $50 credit to your account, they'll get 10% off their first tour.
            {/*   <button onClick={orderHandler} type="submit" class="btn-checkout" disabled={cartItems.length === 0} >To order</button> */}
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