import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct, clearErrors } from '../../action/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Products.css"
import { Search } from '../Product/Search';
import Pagination from 'react-js-pagination'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Top",
  "Camera",
  "Mobile",
  "Shirt",
  "Mobile",
  "Electronic"
  
]



const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();
  const { loading, error, products, productsCount, resultperpage, filterPoductsCount } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e.target.value)
  }


  //slider
  const [price, setPrice] = useState([0, 25000]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);

  }


  const [category, setCategory] = useState("");

  const [rating, setRating] = useState(0);
  let isProduct=true;

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, error, category, rating]);

  let count = filterPoductsCount;






  return <Fragment>
    {
      loading ? <Loader /> :
        <Fragment>


           <div className="productsHeading">
          <h2 >Products</h2>
          </div>
          

          <div className="products" >
            {
              products && products.length != 0 ? products.map((product) => (<ProductCard key={product._id} product={product} />))
                : <Fragment>
                 {  isProduct=false}
                  <h3>Product Not Found!!!</h3>
                </Fragment>

            }
          </div>
          {
            /*filter product */

            (<div className='filterBox'>
              <Typography className='typo' >Price</Typography>
              <Slider
              className='slideprice'
                value={price}
                onChange={priceHandler}
                valueLableDisplay="auto"
                aria-labelledby='range-slider'
                min={0}
                max={15000}
                valueLabelDisplay="auto"
                step={0.5}
                marks={false}
                defaultValue={500}
              />


              {/*Catrgories*/}
              <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {
                  categories.map((category) => (
                    <li
                      className='category-link'
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))
                }

              </ul>
              {/*Rating*/}
              <fieldset>
                <Typography  className='typo' component="legend">Ratings Above</Typography>
                <Slider
                className='slideprice'
                  value={rating}
                  onChange={(e, newRating) => {
                    setRating(newRating);
                  }}
                  aria-lebelledby="contuneous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />


              </fieldset>

            </div>)
          }


          {
            resultperpage < productsCount && (
              <div className='paginationBox'>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultperpage}
                  totalItemsCount={productsCount}
                  pageRangeDisplayed={3}
                  onChange={setCurrentPage}
                  nextPageText="Next"
                  prevPageText="Prev"
                 
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pagelinkActive"


                /></div>
            )
          }


        </Fragment>
    }

  </Fragment>


}

export default Products