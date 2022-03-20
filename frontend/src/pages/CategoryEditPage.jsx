import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { listOrder } from "../redux/actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'
import { updateUserProfile } from "../redux/actions/userActions";
import '../components/Profile.css'
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import Axios from "axios"

import { createCategory } from "../redux/actions/categoryActions";

function CategoryEditPage(props) {

  const userSignIn = useSelector(state => state.userSignIn)
  const { userInfo } = userSignIn

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')
  const [image, setImage] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [categoryDesc, setCategoryDesc] = useState('')
  const [categoryNameUpdate, setCategoryNameUpdate] = useState('')
  const [categoryDescUpdate, setCategoryDescUpdate] = useState('')

  const [currentIdCategory, setCurrentIdCategory] = useState('')

  const [deletedCategory, setDeletedCategory] = useState([])

  const [categories, setCategories] = useState('')
  const userDetails = useSelector(state => state.userDetails)



  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();



  /*   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateUserProfile({
        _id: user._id,
        firstName,
        lastName,
        email,
        image
      }))
    } */

  const submitСategoryCreateHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory({
      categoryName,
      categoryDesc,
      categoryImage: image
    }))
    getDataCategory()
  }

  const submitСategoryUpdateHandler = async (category) => {
    console.log(category.target.value)
    const updatedCategory = {
      categoryName : categoryNameUpdate,
      categoryDesc : categoryDescUpdate,
      categoryImage: image
    }
    category.preventDefault();
    const { data } = await Axios.put(`/api/categories/${currentIdCategory}`, {updatedCategory}, { headers: { Authorization: `Bearer ${userInfo.token}` } })
    getDataCategory()
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

  const deleteHandler = async (category) => {
    if (window.confirm('Are you sure to delete?')) {
      const { data } = await Axios.delete(`/api/categories/${category._id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
      setDeletedCategory(arr => [...deletedCategory, category._id])
    }
  }

  const editCategoryHandler = (category) => {
    setCategoryNameUpdate(category.categoryName)
    setCategoryDescUpdate(category.categoryDesc)
    setCurrentIdCategory(category._id)
  }

  const getDataCategory = async () => {
    const { data } = await Axios.get('/api/categories', { headers: { Authorization: `Bearer ${userInfo.token}` } })
    setCategories(data.categories)
  }

  useEffect(() => {
    getDataCategory()
  }, [])

  return (
    <>
      <div className="cartSection">
        <div className="cartContainer">


          <div className='row'>
            <div className='col-xs-12'>
              <div className='header_section'>
                <h1 className='header_text_profile'>
                  Categories page
                </h1>
              </div>
            </div>
          </div>

          <div className="grid-cart-category">
            <section className="grid-main-column-cart">
              <h1 className="head-text">Create category</h1>
              <div className="item-cart">

                <form className='form_for_new_user' onSubmit={submitСategoryCreateHandler}>
                  <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
{/*                     {errorUpdate && (
                      <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )} */}
{/*                     {categories && (
                      <MessageBox variant="success">
                        
                      </MessageBox>
                    )} */}
                    <div className='row1'>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Name category
                          </span>
                          <input className="form-input" value={categoryName} onChange={e => setCategoryName(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Description category
                          </span>
                          <input className="form-input" value={categoryDesc} onChange={e => setCategoryDesc(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Category Image
                          </span>
                          <input className="form-input" type="file" id="fileUpdate" onChange={uploadFileHandler} />
                          {loadingUpload && <LoadingBox></LoadingBox>}
                          {errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                          )}
                        </label>
                      </div>

                      <button className='btn_auth' type="submit" >
                        Create
                      </button>
                    </div>

                  </>

                </form>

              </div>



              <h1 className="head-text">Create category</h1>
              <div className="item-cart">

                <form className='form_for_new_user' onSubmit={submitСategoryUpdateHandler}>
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
                            Id category
                          </span>
                          <input className="form-input" value={currentIdCategory} onChange={e => setCategoryNameUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Name category
                          </span>
                          <input className="form-input" type="hidden" value={categoryNameUpdate} onChange={e => setCategoryNameUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Description category
                          </span>
                          <input className="form-input" value={categoryDescUpdate} onChange={e => setCategoryDescUpdate(e.target.value)} type="text" />
                        </label>
                      </div>

                      <div className='form-box'>
                        <label className="form-box__field" >
                          <span className='form-label'>
                            Category Image
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

                </form>

              </div>




            </section>

            <section className="grid-checkout-column">
              <h1 className="head-text">Table category</h1>
              <div className="item-cart">
                <table className="table">
                  <thead>
                    <tr>
                      <th>categoryName</th>
                      <th>categoryDesc</th>
                      <th>categoryImage</th>
                      <th>btn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories && categories.filter(row => !deletedCategory.includes(row._id)).map(category => (
                      /*           {categories && categories.map(category => ( */
                      <tr key={category._id}>
                        <td>{category.categoryName}</td>
                        <td>{category.categoryDesc}</td>
                        <td>{category.categoryImage}</td>

                        <td>
                          <button
                            type="button"
                            className="btn_details_admin"
                            onClick={() => editCategoryHandler(category)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn_details_admin"
                            onClick={() => deleteHandler(category)}
                          >
                            Delete
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </div>
      </div>

    </>
  )
}

export default CategoryEditPage