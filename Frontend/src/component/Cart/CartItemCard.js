import React from 'react'
import './CartItemCard.css';
import { Link } from 'react-router-dom';

const CartItemCard = ({ item,deleteItemsFromCart }) => {


    return <div className='CartItemCard'>
        <img src={item.image} alt="ssa" />
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>{deleteItemsFromCart(item.product)}}>Remove</p>
        </div>


    </div>
}

export default CartItemCard