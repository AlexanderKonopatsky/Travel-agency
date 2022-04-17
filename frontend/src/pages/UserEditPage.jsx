import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser, userEdit } from "../redux/actions/userActions";
import { USER_EDIT_RESET, USER_DETAILS_RESET } from "../redux/constants/userConstants"
import Axios from "axios"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


function UserEditPage(props) {
  const userId = props.match.params.id
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [isActive, setIsActive] = useState('')


  const userDetails = useSelector(state => state.userDetails)
  const { loading: loadingDetails, error: errorDetails, user } = userDetails

  const updateUser = useSelector(state => state.updateUser)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = updateUser

  const dispatch = useDispatch()

  const options = [
    'true', 'false',
  ];


  useEffect(() => {

    if (!user /* || successUpdate */) {
      /* dispatch({ type: USER_EDIT_RESET}) */
      dispatch(detailsUser(userId))
    } else {

      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setIsActive(user.isActive)
      setIsAdmin(user.isAdmin)

    }
  }, [dispatch, user, userId])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      userEdit({
        _id: userId,
        firstName, lastName, email, isAdmin, isActive
      })
    )
  }

  const backHandler = () => {
    props.history.push('/userList')
  }

  const isActiveHandler = (data) => {
    setIsActive(data.value)
  }

  return (
    <div>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  Обновить пользователя      
                </h1>
              </div>
            </div>
          </div>

          <section className="grid-main-column-tour">
            <h1 className="head-text"> </h1>
            <div className="item-tour">

              <form className='form_for_new_user' onSubmit={submitHandler}>

                { errorDetails ? (
                  <MessageBox variant="danger">{errorDetails}</MessageBox>
                ) : (
                  <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                      <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                      <MessageBox variant="success">
                        {firstName.toUpperCase()} Updated Successfully
                      </MessageBox>
                    )}
                    <div className='row'>
                    <div className='form-box'>
                    {loadingDetails && <LoadingBox></LoadingBox>}
                    </div>
                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Имя
                          </span>
                          <input className="form-input" value={firstName} onChange={e => setFirstName(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Фамилия
                          </span>
                          <input className="form-input" value={lastName} onChange={e => setLastName(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Почта
                          </span>
                          <input className="form-input" value={email} onChange={e => setEmail(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            IsAdmin
                          </span>
                          <input disabled className="form-input" value={isAdmin} onChange={e => setIsAdmin(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            IsActive - {isActive}
                          </span>
                        </label>
                        <Dropdown type="text" options={options} value={String(isActive)} onChange={isActiveHandler} placeholder="Select an option" />
                      </div>

                      <button className='btn_auth' type="submit" >
                        Обновить
                      </button>
                      <button className='btn_auth' onClick={backHandler} >
                        Вернуться к списку всех пользователей  
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

export default UserEditPage