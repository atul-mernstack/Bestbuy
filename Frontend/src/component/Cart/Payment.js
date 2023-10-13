

import React, { Fragment, useEffect, useRef, useState } from "react";
import "./payment.css"
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
  
} from "@stripe/react-stripe-js";
import Loader from "../layout/Loader/Loader";
import axios from "axios";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from '../../action/orderAction'
import {removeItemsFromCart} from '../../action/cartAction'



export const Payment = () => {
  const history = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
const[btn_disable,setbtn_disable]=useState(false);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setbtn_disable(true);
    payBtn.current.disabled = true;

    try {
      const config = {
       
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("hekoo")
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      
      const client_secret = data.client_secret;
      console.log("hekoo22")
      if (!stripe || !elements) return;
      const cardNumber1 = elements.getElement(CardNumberElement);
     
      
      
      const result = await stripe.confirmCardPayment(`${client_secret}`, {
        payment_method: {
        

          card:cardNumber1,
         
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          //now it time to remove item from cart
          (order.orderItems).map((orderItems)=> dispatch(removeItemsFromCart(orderItems.product)))

          history("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log(error);
     payBtn.current.disabled = false;
      alert.error(error.response.data);
    }
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert,btn_disable,removeItemsFromCart]);


  return <Fragment>
    <MetaData title="Payment" />
    <CheckoutSteps activeStep={2} />{
     (
        <div className="paymentformfirstDiv">
          <div className="paymentContainer">
          
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
              <Typography>Card Info</Typography>
              <div>

                <CreditCardIcon />
               
                <CardNumberElement  autofocus required className="paymentInput" />
                
              </div>
              <div className="carddemowraper">
              <span className="carddemo">Card No :4242 4242 4242 4242</span>
              </div> 
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
               <div className="carddemowraper">
              <span className="carddemo">Card Expiary : 23/40</span>
              </div> 
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>
             <div className="carddemowraper">
              <span className="carddemo">Card CVV. 345</span>
              </div>

              <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}

                className="paymentFormBtn"
              />
            </form>
           
          </div>

        </div>)}
  </Fragment>
}
