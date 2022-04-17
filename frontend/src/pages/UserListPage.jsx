import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'
import { USER_DETAILS_RESET } from "../redux/constants/userConstants"


function UserListPage(props) {

  const listUser = useSelector(state => state.listUser)
  const { users, loading, error } = listUser



  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userList())
    dispatch({type: USER_DETAILS_RESET})
  }, [dispatch])

  const editUserHandler = (user) => {
    props.history.push(`/user/${user._id}/edit`)
  }


  return (
    <>
      <  div className="orderList">
        {loading ? (<LoadingBox></LoadingBox> ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Почта</th>
                <th>Пароль  </th>
                <th>isAdmin</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users &&   users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{String(user.isAdmin)}</td>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>{user.updatedAt.substring(0, 10)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn_details_order"
                      onClick={() => {
                        editUserHandler(user)
                      }}
                    >
                      Обновить   
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default UserListPage