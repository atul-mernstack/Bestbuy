import React from 'react';

import Profile  from '../../images/Profile.png'
import "./ProductDetails.css";
import {Rating} from '@material-ui/lab'
const ReviewCard = ({review}) => {

  
  //options
  const options = {
    size: "large",
    value: review.rating,
    readOnly:true,
    precision:0.5
  };
  return (
    <div className='reviewCard'>
      <img src={Profile} alt="User"/>
       <p>{review.name}</p>
       <Rating {...options}/>
       <span className='comment-review-span revviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard