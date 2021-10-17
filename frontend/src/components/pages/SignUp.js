import React from "react";
import Footer from "../Footer";
import { Link } from 'react-router-dom';
import '../SignUp.css'

function SignUp() {
  return (
    <>
      <div className="signUp_section">
        <div className='container'>
          <div className='row'>
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
          <div className='form_login'>
            <div className='section_form col-md-6 col-md-offset-3'>
              <form className='form_for_new_user' action='/' method='post'>
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
                        <input className="form-input" type="text"  />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Latt Name
                        </span>
                        <input className="form-input" type="text"  />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Email
                        </span>
                        <input className="form-input" type="text"  />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Password
                        </span>
                        <input className="form-input" type="text"  />
                      </label>
                    </div>

                    <div className='form-box'>
                      <label className="form-box__field" >
                        <span className='form-label'>
                            Confirm password
                        </span>
                        <input className="form-input" type="text"  />
                      </label>
                    </div>

                    <a className='btn_auth' href='/'  >
                
                      <span >Sign Up with Email</span>
                    </a>
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