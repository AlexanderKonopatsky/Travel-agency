import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer";
import { signUp} from "../../redux/actions/userActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import '../SignUp.css'

function SignUp(props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo, loading, error } = userSignIn

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
    } else {
      dispatch(signUp(firstName, lastName, email, password))
    }

 
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push('/')
    }
  }, [props.history, userInfo])

  return (
    <>
      <div className="signUp_section">
        <div className='container'>
          <div className='row2'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text'>
                  Create an Account
                </h1>
                <p className='header_under'>
                 Already have an account?    
                  <a href='login' className='link_login'>Login.</a>
                </p>
              </div>
            </div>
          </div>

          <div className='section_message'>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>

          <div className='form_login'>
            <div className='section_form'>
              <form className='form_for_new_user' onSubmit={submitHandler}>
                <div className='row1'>

                     < div className='text-divider'>
                      <div className='text-divider__divider'></div>
                      <div className='text-divider__text'>OAuth authorization</div>
                      <div className='text-divider__divider'></div>
                    </div>
            
                    <a className='btn_auth' href='/'  data-facebook-login>
                      <span >Sign Up with Vk</span>
                    </a>
                 
              
                    <a className='btn_auth' href='/'  data-facebook-login>
                      <span >Sign Up with Gmail</span>
                    </a>
                   
                    < div className='text-divider'>
                      <div className='text-divider__divider'></div>
                      <div className='text-divider__text'>or sign up with email</div>
                      <div className='text-divider__divider'></div>
                    </div>
                  
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
                      Sign Up with Email
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp