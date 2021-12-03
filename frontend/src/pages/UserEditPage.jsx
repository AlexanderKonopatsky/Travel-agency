import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsUser, userEdit } from "../redux/actions/userActions";
import { USER_EDIT_RESET, USER_DETAILS_RESET } from "../redux/constants/userConstants"
import Axios from "axios"


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
  }, [dispatch, successUpdate, user, userId])


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


  return (
    <div>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  Edit User
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
                    {successUpdate && (
                      <MessageBox variant="success">
                        User Updated Successfully
                      </MessageBox>
                    )}
                    <div className='row'>

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
                          <input className="form-input" value={email} onChange={e => setEmail(e.target.value)} type="text" />
                        </label>
                      </div>


                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            IsAdmin
                          </span>
                          <input className="form-input" value={isAdmin} onChange={e => setIsAdmin(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            IsActive
                          </span>
                          <input className="form-input" value={isActive} onChange={e => setIsActive(e.target.value)} type="text" />
                        </label>
                      </div>





                      <button className='btn_auth' type="submit" >
                        UPDATE
                      </button>
                      <button className='btn_auth' onClick={backHandler} >
                        RETURN TO THE LIST OF USERS
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