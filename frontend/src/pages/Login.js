import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/SignUp.css'

function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo, loading, error } = userSignIn

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signIn(email, password))

  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo])

  return (
<>
      <div className="signUp_section">
        <div className='container'>
          <div className='row2'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text'>
                  Log in to your account
                </h1>
                <p className='header_under'>
                  Don't have an account? 
                  <a href='login' className='link_login'>Sign up.</a>
                </p>
              </div>
            </div>
          </div>

          <div className='section_message'>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>

          <div className='form_login'>
            <div className='section_form '>
              <form className='form_for_new_user' onSubmit={submitHandler}>
                <div className='row1'>
                  
                  < div className='text-divider'>
                    <div className='text-divider__divider'></div>
                    <div className='text-divider__text'>OAuth authorization</div>
                    <div className='text-divider__divider'></div>
                  </div>

                  <a className='btn_auth' href='/'  data-facebook-login>
                    <span >Log in with Vk</span>
                  </a>


                  <a className='btn_auth' href='/'  data-facebook-login>
                    <span >Log in with Gmail</span>
                  </a>

                  < div className='text-divider'>
                    <div className='text-divider__divider'></div>
                    <div className='text-divider__text'>or sign in with email</div>
                    <div className='text-divider__divider'></div>
                  </div>

                  <div className='form-box'>
                  <label className="form-box__field" >
                    <span className='form-label'>Email</span>
                    <input className="form-input" type="email" onChange={ e => setEmail(e.target.value)}  required />
                  </label>
                  </div>

                  <div className='form-box'>
                  <label className="form-box__field" >
                    <span className='form-label'>Password</span>
                    <input className="form-input" type="password" onChange={ e => setPassword(e.target.value)} generateJsonToken />
                  </label>
                </div>


                <button className='btn_auth'  type="submit" >
                  Log in with Email
                </button>
                
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login