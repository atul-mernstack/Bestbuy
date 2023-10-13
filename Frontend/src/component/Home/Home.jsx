import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { getProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../action/productAction";
import { Search } from "../Product/Search";
import { useState } from "react";
import SliderWrap from "./SliderWrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';
import MetaData from "../layout/MetaData";

import HomepageImage from '../../images/HomepageImage.jpg'
import HomeImage from "./HomeImage";
const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );


  //dialog
  const [open, setOpen] = useState(true);




  const submitReviewHandler = () => {

    setOpen(false);
  }


  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }







    dispatch(getProduct());
  }, [dispatch, error, alert, open]);


  return (
    <>
      {loading ? <Loader /> : <Fragment>
        <MetaData title={"Home Page"} />

        <HomeImage />

        <SliderWrap />


        <h2 className="homeHeading">Featured Products</h2>

        <div className="featuredproduct" id="container">
          {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>

        {/* <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewHandler}

        >
          <div className="closeBtnBox">
            <DialogTitle>About Developer</DialogTitle>

            <Button onClick={submitReviewHandler} color="primary">&#10060;</Button>
          </div>




          <DialogContent className="dialogcontent">


            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat alias tempora nihil
              sit similique molestias? Vitae beatae ducimus quam eaque corporis consequatur natus esse,
              ex repellat magni totam aperiam porro!</p>

          </DialogContent>
          <DialogActions>


          </DialogActions>

  </Dialog>*/}
      </Fragment>
      }
    </>
  );
};

export default Home;
