import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderAdmin, deleteOrder } from "../redux/actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../components/orderList.css'

function OrderListAdminPage(props) {
  const [deletedOrder, setDeletedOrder] = useState([])
  const orderListAdmin = useSelector(state => state.orderListAdmin)
  const { orders, loading, error } = orderListAdmin

  const orderDeleteAdmin = useSelector(state => state.orderDeleteAdmin)
  const { success: successDelete, loading: loadingDelete, error: errorDelete } = orderDeleteAdmin

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listOrderAdmin())
  }, [dispatch])

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id))
      setDeletedOrder(arr => [...deletedOrder, order._id])
    }
  }

  return (
    <>
      <  div className="orderList">
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ? (<LoadingBox></LoadingBox> ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>

                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.filter(row => !deletedOrder.includes(row._id)).map(order => (

                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>----</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn_details_order"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="btn_details_order"
                      onClick={() => {
                        deleteHandler(order)
                      }}
                    >
                      Delete
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

export default OrderListAdminPage