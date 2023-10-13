import React from "react";
import { Link } from "react-router-dom";

import "./Home.css"
import {useNavigate} from'react-router-dom'
import {Rating} from '@material-ui/lab'

const ProductCard = ({ product }) => {

  const options = {
    size: "large",
    value: product.ratings,
    readOnly:true,
    precision:0.5
  };


const navigate = useNavigate();


const go = (e) => {
    e.preventDefault();
    
        navigate(`/product/${product._id}`)
    
    }
 
  return <>
<div className="productCard">
    <Link  style={{color:'black',textDecoration:'none'}} onClick={go}>
     
      <img  className="imgcard" src={product.images.length>0 ?product.images[0].url:""} alt={product.name} />
      <p className="productcardname">{product.name}</p>
      <div>
        <Rating className="rating"{...options}/>
       
      </div>
      <span className="productpricespan">Price : &#8377;{product.price}</span>
     
    </Link>
</div>
    </>
};

export default ProductCard;
