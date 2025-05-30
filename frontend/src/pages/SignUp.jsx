import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, signIn } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/SignUp.css'
import Axios from "axios";

function SignUp(props) {

   const [firstName, setFirstName] = useState('')
   const [errorFirstName, setErrorFirstName] = useState('The first name field cannot be empty')
   const [dirtyFirstName, setDirtyFirstName] = useState(false)

   const [lastName, setLastName] = useState('')
   const [errorLastName, setErrorLastName] = useState('The last name field cannot be empty')
   const [dirtyLastName, setDirtyLastName] = useState(false)

   const [email, setEmail] = useState('')
   const [errorEmail, setErrorEmail] = useState('Email cannot be empty')
   const [dirtyEmail, setDirtyEmail] = useState(false)

   const [password, setPassword] = useState('')
   const [errorPassword, setErrorPassword] = useState('Password cannot be empty')
   const [dirtyPassword, setDirtyPassword] = useState(false)

   const [confirmPassword, setConfirmPassword] = useState('')
   const [errorConfirmPassword, setErrorConfirmPassword] = useState('Confirm password cannot be empty')
   const [dirtyConfirmPassword, setDirtyConfirmPassword] = useState(false)
   const [messageAlertEmail, setMessageAlertEmail] = useState(false)

   const [formValid, setFormValid] = useState(false)

   useEffect(() => {
      if (errorLastName || errorFirstName || errorEmail || errorPassword || errorConfirmPassword) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [errorConfirmPassword, errorEmail, errorFirstName, errorLastName, errorPassword])



   const firstNameHandler = (e) => {
      setFirstName(e.target.value)
      if (e.target.value.length > 25 || e.target.value.length < 3) {
         setErrorFirstName('First name length from 3 to 25 characters')
         if (!e.target.value)
            setErrorFirstName('First name cannot be empty')
      } else {
         setErrorFirstName("")
      }
   }

   const lastNameHandler = (e) => {
      setLastName(e.target.value)
      if (e.target.value.length > 25 || e.target.value.length < 3) {
         setErrorLastName('Last name length from 3 to 25 characters')
         if (!e.target.value)
            setErrorLastName('Last name cannot be empty')
      } else {
         setErrorLastName("")
      }
   }

   const MessageBoxStyle = {
      'margin-top': '15px',

   };


   const emailHandler = (e) => {
      setEmail(e.target.value)
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(String(e.target.value).toLowerCase())) {
         setErrorEmail('Неверная почта')
         if (!e.target.value)
            setErrorEmail('Поле почты не может быть пустым')
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

   const confirmPasswordHandler = (e) => {
      setConfirmPassword(e.target.value)
      if (e.target.value.length < 4 || e.target.value.length > 30) {
         setErrorConfirmPassword('Confirm password length from 4 to 30 characters')
         if (!e.target.value)
            setErrorConfirmPassword('Confirm password cannot be empty')
      } else {
         setErrorConfirmPassword("")
      }
   }

   const blurHandler = (e) => {
      switch (e.target.name) {
         case 'firstname':
            setDirtyFirstName(true)
            break
         case 'lastname':
            setDirtyLastName(true)
            break
         case 'email':
            setDirtyEmail(true)
            break
         case 'password':
            setDirtyPassword(true)
            break
         case 'confiremPassword':
            setDirtyConfirmPassword(true)
            break
         default:
            break
      }
   }


   const dispatch = useDispatch()

   const userSignUp = useSelector(state => state.userSignUp)
   const { userInfo, loading, error } = userSignUp

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
         setMessageAlertEmail('На вашу почту отправлено письмо с ссылкой для подтверждения.')
         checkVerification()
         //props.history.push('/')
      } else {
         setMessageAlertEmail(false)

      }
   }, [props.history, userInfo])


   const checkVerification = async () => {
      let interval = setInterval(async () => {
         const { data } = await Axios.get(`/api/users/checkVerification/${userInfo._id}`)
         if (data.message.verified) {
            clearInterval(interval)
            dispatch(signIn(userInfo.email, password))
            setMessageAlertEmail("Почта успешно подтверждена")
         }
      }, 1000)

   }

   const signInHandler = () => {
      props.history.push('/login')
   }

   return (
      <>
         <div className="signUp_section">
            <div className='container'>
               <div className='row2'>
                  <div className='col-xs-12'>
                     <div className='header_section'>
                        <h1 className='header_text'>
                           Создание аккаунта
                        </h1>
                        <p className='header_under'>
                           Уже есть аккаунт?
                           <button onClick={signInHandler} className="ul-user">Войти</button>
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
                              <div className='text-divider__text'>Sign up with email</div>
                              <div className='text-divider__divider'></div>
                           </div>

                           <div className='form-box'>
                              <label className="form-box__field" >
                                 <span className='form-label'>
                                    Имя
                                 </span>
                                 <input name="firstname" className="form-input" value={firstName} onChange={firstNameHandler} onBlur={e => blurHandler(e)} type="text" required />
                              </label>
                              {(dirtyFirstName && errorFirstName) && <p className="error-validate">{errorFirstName}</p>}
                           </div>

                           <div className='form-box'>
                              <label className="form-box__field" >
                                 <span className='form-label'>
                                    Фамилия
                                 </span>
                                 <input name="lastname" className="form-input" value={lastName} onChange={lastNameHandler} onBlur={e => blurHandler(e)} type="text" required />
                              </label>
                              {(dirtyLastName && errorLastName) && <p className="error-validate">{errorLastName}</p>}
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

                           <div className='form-box'>
                              <label className="form-box__field" >
                                 <span className='form-label'>
                                    Подтвердите пароль
                                 </span>
                                 <input name="confiremPassword" className="form-input" value={confirmPassword} type="password" onChange={confirmPasswordHandler} onBlur={e => blurHandler(e)} required />
                              </label>
                              {(dirtyConfirmPassword && errorConfirmPassword) && <p className="error-validate">{errorConfirmPassword}</p>}
                           </div>

                           <button disabled={!formValid} className='btn_auth' type="submit" >
                              Регистрация
                           </button>

                           {messageAlertEmail &&
                              <div variant="success" style={MessageBoxStyle} className={`alert alert-success`} >
                                 {messageAlertEmail}
                              </div>
                           }



                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default SignUp