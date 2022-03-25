import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import '../components/SignUp.css'

function Login(props) {

   const [email, setEmail] = useState('')
   const [errorEmail, setErrorEmail] = useState('Email cannot be empty')
   const [dirtyEmail, setDirtyEmail] = useState(false)

   const [password, setPassword] = useState('')
   const [errorPassword, setErrorPassword] = useState('Password cannot be empty')
   const [dirtyPassword, setDirtyPassword] = useState(false)
   const [forgotPassword, setForgotPassword] = useState(false)

   const [formValid, setFormValid] = useState(false)


   const [alert, setAlert] = useState('')
   const [errorFirstName, setErrorFirstName] = useState('')
   const [messageAlert, setMessageAlert] = useState(false)
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

   const passwordHandler = (e) => {
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

   const loginHandler = () => {
      setForgotPassword(true)

   }

   const MessageBoxStyle = {
      'margin-top': '15px',

   };
   const signUpHandler = () => {
      props.history.push('/signUp')
   }

   const forgotPasswordHandler = () => {
      setForgotPassword(true)
   }
   const sendEmailResetPasswordHandler = async (e) => {
      e.preventDefault();
      const data = await Axios.post('/api/users/requestPasswordReset', { email })
      if (data.status === 200) {
         setMessageAlert(`Письмо с ссылкой отправлено на почту`)
      }
     
   }

   return (
      <>
         <div className="signUp_section">
            <div className='container'>
               <div className='row2'>
                  <div className='col-xs-12'>
                     <div className='header_section'>
                        <h1 className='header_text'>
                           Войдите в ваш аккаунт
                        </h1>
                        <p className='header_under'>
                           У вас нет аккаунта
                           <button onClick={signUpHandler} className="ul-user">Создайте</button>
                           {/*   У вас нет аккаунта?
                  onClick={signUpHandler}
                  <a href='/signUp' className='link_login'>Sign up.</a> */}
                        </p>
                     </div>
                  </div>
               </div>


               <div className='section_message'>
                  {loading && <LoadingBox></LoadingBox>}

                  {!forgotPassword && error && <MessageBox variant="danger">{error}</MessageBox>}

               </div>}

               <div className='form_login'>
                  <div className='section_form '>
                     {!forgotPassword &&
                        <form className='form_for_new_user' onSubmit={submitHandler}>
                           <div className='row1'>


                              <>
                                 < div className='text-divider'>
                                    <div className='text-divider__divider'></div>
                                    <div className='text-divider__text'>OAuth authorization</div>
                                    <div className='text-divider__divider'></div>
                                 </div>

                                 <a className='btn_auth' href='/' data-facebook-login>
                                    <span >Войдите с помощью VK</span>
                                 </a>


                                 <a className='btn_auth' href='/' data-facebook-login>
                                    <span >Войдите с помощью Gmail</span>
                                 </a>

                                 < div className='text-divider'>
                                    <div className='text-divider__divider'></div>
                                    <div className='text-divider__text'>Log in with email</div>
                                    <div className='text-divider__divider'></div>
                                 </div>

                                 <div className='form-box'>
                                    <label className="form-box__field" >
                                       <span className='form-label'>
                                          Почта
                                       </span>
                                       <input name="email" className="form-input" value={email} type="email" onChange={emailHandler} onBlur={e => blurHandler(e)} required />
                                    </label>
                                    {(dirtyEmail && errorEmail) && <p className="error-validate">{errorEmail}</p>}
                                 </div>

                                 <div className='form-box'>
                                    <label className="form-box__field" >
                                       <span className='form-label'>
                                          Пароль
                                       </span>
                                       <input name="password" className="form-input" value={password} type="password" onChange={passwordHandler} onBlur={e => blurHandler(e)} required />
                                    </label>
                                    {(dirtyPassword && errorPassword) && <p className="error-validate">{errorPassword}</p>}
                                 </div>


                                 <button disabled={!formValid} className='btn_auth' type="submit" >
                                    Вход {alert && alert}
                                 </button>
                                 <button className='btn_auth' onClick={forgotPasswordHandler} >
                                    Забыли пароль?
                                 </button>
                              </>





                           </div>
                        </form>
                     }

                     {forgotPassword && <>
                        <form className='form_for_new_user' >
                           <div className='row1'>
                              <div className='form-box'>
                                 <label className="form-box__field" >
                                    <span className='form-label'>
                                       Введите свою почту
                                    </span>
                                    <input name="email" className="form-input" value={email} type="email" onChange={emailHandler} onBlur={e => blurHandler(e)} required />
                                 </label>
                                 {(dirtyEmail && errorEmail) && <p className="error-validate">{errorEmail}</p>}
                              </div>
                              <button className='btn_auth' onClick={sendEmailResetPasswordHandler} >
                                 Выслать письмо на почту
                              </button>
                              {  messageAlert && 
                              <div variant="success" style={MessageBoxStyle} className={`alert alert-success`} >
                                 {messageAlert} 
                              </div>
                           }
 {/*                              <button className='btn_auth' onClick={loginHandler} >
                                 Вернуться к входу через почту
                              </button> */}
                           </div>
                        </form>
                     </>}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Login