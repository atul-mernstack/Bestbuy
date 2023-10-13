import React, { Fragment } from 'react'
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import SideBar from "./Sidebar";
import { Link, useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { getOrderDetails, clearErrors, updateOrder } from '../../action/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant';

const ProcessOrder = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { error: updatedError, isUpdated } = useSelector((state) => state.order);




  const [status, setStatus] = useState("");


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updatedError) {
      alert.error(updatedError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Status Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      history('/admin/orders');

    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert, id, isUpdated, updatedError])




  const processOrderSubmitHandler = (e) => {

    e.preventDefault();
    const updateData = {
      "orderStatus": status,
      "product": id,
      "quantity": order.orderItems[0].quantity
    }

    dispatch(updateOrder(id, updateData));

  };

  return <>
    {
      loading ? (<Loader />) : (<Fragment>
        <MetaData title="Update Product" />
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer">
            <div className="confirmOrderPage">
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              {order.orderStatus !== "Delivered" && (
                <>
                  <div>
                    <form
                      className="createProductForm"
                      encType="multipart/form-data"
                      onSubmit={processOrderSubmitHandler}
                    >

                      <h1>Process Order Update</h1>
                      <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Choose Status</option>
                          {
                            order.orderStatus === "Processing" && (
                              <option value="Shipped">Shipped</option>
                            )
                          }
                          {
                            order.orderStatus === "Shipped" && (
                              <option value="Delivered">Delivered</option>
                            )
                          }



                        </select>
                      </div>







                      <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={loading ? true : false || status === "" ? true : false}
                      >
                        Update
                      </Button>
                    </form>
                 
                </div>
                </> ) }
            </div>
          </div>
        </div>





      </Fragment>)
    }
  </>
}

export default ProcessOrder;