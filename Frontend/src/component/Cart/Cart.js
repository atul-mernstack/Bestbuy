import React, { Fragment } from 'react'
import "./Cart.css";
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux'
import {addItemsToCart,removeItemsFromCart} from '../../action/cartAction'
import {Typography} from'@material-ui/core';
import   RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
const navigate = useNavigate();
  const dispatch =useDispatch();
  const{ cartItems}=useSelector((state)=>state.cart);
 
 const increseQuantity=(id,quantity,stock)=>{
  const newQuty=quantity+1;
  if(stock<=quantity)
  return;
  dispatch(addItemsToCart(id,newQuty));

 }

 const decreaseQuantity=(id,quantity,stock)=>{
  const newQuty=quantity-1;
  if(quantity<=1)
  return;
  dispatch(addItemsToCart(id,newQuty));

 }

 //deleting item from cart
 const deleteItemsFromCart=(id)=>{
  dispatch(removeItemsFromCart(id));
 }

const checkoutHandler=()=>{
   navigate("/login?redirect=shipping")
}


  return <Fragment>
    {
      cartItems.length===0?(
        <Fragment>
        <div className='emptyCart'>
          <RemoveShoppingCartIcon/>
          <Typography>No Product in Your Cart</Typography>
          <Link to='/products'>View Products</Link>
        </div>
        </Fragment>)
        :<Fragment>
    <div className='cartPage'>
      <div className='cartHeader'>
        <p>Product</p>
        <p>Quantity</p>
        <p>SubTotal</p>

      </div>
      {
        cartItems.map((item)=>(
          <div className='cartContainer' key={item.product}>

        <CartItemCard   item={item}  deleteItemsFromCart={deleteItemsFromCart}/>
        <div className="cartInput">
         
          <button onClick={()=>{decreaseQuantity(item.product,item.quantity,item.stock)}}>-</button>
          <input  className="cartinputbox"value={item.quantity} type="number" readOnly />
          <button onClick={()=>{increseQuantity(item.product,item.quantity,item.stock)}}>+</button>
        </div>
       
        <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
      </div>
        ))
      }



      <div className='cartGrossTotal'>
        <div></div>

        <div className='cartGrossTotalBox'>
          <p>Gross Total</p>
          <p>{`₹${cartItems.reduce(
            (acc,item)=>acc+item.quantity*item.price,
            0
          )}`}</p>
        </div>
        <div></div>

        <div className='checkOutBtn' >
          <button onClick={checkoutHandler}>Check Out</button>
        </div>

      </div>


    </div>
  </Fragment>
    }
  </Fragment>
}

export default Cart