import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../action/productAction";
import "./ProductDetails.css";

import { useAlert } from "react-alert";
import ReviewCard from "./ReviewCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {addItemsToCart} from '../../action/cartAction'
import { Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 Button
}from'@material-ui/core';
import {Rating} from '@material-ui/lab'
import { NEW_REVIEW_RESET } from "../../constants/productConstant";



const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
const alert = useAlert();
  //getting product from redux store.
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  //get review from store
  const {success,error:reviewError }= useSelector((state)=>state.newReview)
  let[numberOfProduct,setnumberOfProduct]=useState(1);

  const increment=()=>{
  if(product.Stock<=numberOfProduct)
    return;
    setnumberOfProduct(++numberOfProduct);
  }
  const decrement=()=>{
    if(numberOfProduct<=1)
      return;
      setnumberOfProduct(--numberOfProduct);
    }

  const addToCartHandler =()=>{
    dispatch(addItemsToCart(id,numberOfProduct));
    alert.success("Item Added To Cart");
  }


//dialog
const[open,setOpen]=useState(false);
const[rating,setRating]=useState(0);
const[comment,setComment] =useState("");

const submitReviewToggle=()=>{
  open?setOpen(false):setOpen(true);
}

const submitReviewHandler=()=>{
  const reviewData={
    "rating":rating,
    "comment":comment,
    "productId":id
  }

  dispatch(newReview(reviewData));
  setOpen(false);
}


  //saving product into store
  useEffect(() => { 
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(reviewError){
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Review Submitted successfully");
      dispatch({type:NEW_REVIEW_RESET});
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert,newReview,success,reviewError,product]);

  

 

  //options
  const options = {
    
    size: "large",
    value: product.ratings,
    readOnly:true,
    precision:0.5
  };

  let items_image=[];
  const handleDragStart = (e) => e.preventDefault();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div className="imagesection">
               <Carousel
                 className="CarouselImage"
                showArrows={true}
                // showThumbs={false}
                // showStatus={false}
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img  className="slideimage" key={item.url} src={item.url} alt={`${i} Slide`} />
                  ))}
              </Carousel> 

             
             

              
             
            </div>

            <div  className="detailssection">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                {
                  //<p>Product # {product._id}</p>
                }
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">({product.numOfReviews}) Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>&#8377;{product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button style={{padding:".6rem"}} onClick={decrement}>-</button>
                    <input readOnly value={numberOfProduct} type="number" />
                    <button onClick={increment}>+</button>
                  </div>{" "}
                  <button disabled={product.Stock<1?true:false} onClick={addToCartHandler}>Add to Cart</button>
                </div>

                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStcok" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
         
         <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
         >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
             onChange={(e)=>setRating(e.target.value)}
             value={rating.toString()}
             size="large"
            />

            <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            ></textarea>

          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">Cancle</Button>
            <Button  onClick={submitReviewHandler}color="primary">Submit</Button>
          </DialogActions>

         </Dialog>




          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No reviews Yet</p>
          )}
        </Fragment>
      )}
    </>
  );
};

export default ProductDetails;
