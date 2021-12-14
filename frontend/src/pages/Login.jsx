import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/SignUp.css'

function Login(props) {

  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('Email cannot be empty')
  const [dirtyEmail, setDirtyEmail] = useState(false)

  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('Password cannot be empty')
  const [dirtyPassword, setDirtyPassword] = useState(false)

  const [formValid, setFormValid] = useState(false)


  const [alert, setAlert] = useState('')
  const [errorFirstName, setErrorFirstName] = useState('')
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

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(String(e.target.value).toLowerCase())) {
      setErrorEmail('Incorrect email')
      if (!e.target.value)
        setErrorEmail('Email cannot be empty')
    } else {
      setErrorEmail("")
    }
  }

  const passwordHandler =  (e) => {
     setPassword(e.target.value)
    if (e.target.value.length < 4 || e.target.value.length > 30) {
      setErrorPassword('Password length from 4 to 30 characters')
      if (!e.target.value)
        setErrorPassword('Password cannot be empty')
    } else {
      setErrorPassword("")
    }
  }

    const blurHandler = (e) => {
    console.log(e.target.name)
    switch (e.target.name) {
      case 'email':
        setDirtyEmail(true)
        break
      case 'password':
        setDirtyPassword(true)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo])


  useEffect(() => {
    if (errorEmail || errorPassword) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [errorEmail, errorPassword])

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
                  <a href='/signUp' className='link_login'>Sign up.</a>
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

{/*                   < div className='text-divider'>
                    <div className='text-divider__divider'></div>
                    <div className='text-divider__text'>OAuth authorization</div>
                    <div className='text-divider__divider'></div>
                  </div>

                  <a className='btn_auth' href='/' data-facebook-login>
                    <span >Log in with Vk</span>
                  </a>


                  <a className='btn_auth' href='/' data-facebook-login>
                    <span >Log in with Gmail</span>
                  </a> */}

                  < div className='text-divider'>
                    <div className='text-divider__divider'></div>
                    <div className='text-divider__text'>Log in with email</div>
                    <div className='text-divider__divider'></div>
                  </div>

                  <div className='form-box'>
                    <label className="form-box__field" >
                      <span className='form-label'>
                        Email
                      </span>
                      <input name="email" className="form-input" value={email} type="email" onChange={emailHandler} onBlur={e => blurHandler(e)} required />
                    </label>
                    {(dirtyEmail && errorEmail) && <p className="error-validate">{errorEmail}</p>}
                  </div>

                  <div className='form-box'>
                    <label className="form-box__field" >
                      <span className='form-label'>
                        Password
                      </span>
                      <input name="password" className="form-input" value={password} type="password" onChange={passwordHandler} onBlur={e => blurHandler(e)} required />
                    </label>
                    {(dirtyPassword && errorPassword) && <p className="error-validate">{errorPassword}</p>}
                  </div>


                  <button disabled={!formValid} className='btn_auth' type="submit" >
                    Log in with Email {alert && alert}
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