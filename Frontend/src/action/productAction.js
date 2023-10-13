import axios from "axios";

import {
  All_PRODUCT_FAIL,
  All_PRODUCT_REQUEST,
  All_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
 
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  All_REVIEW_FAIL,
  All_REVIEW_REQUEST,
  All_REVIEW_SUCCESS
} from "../constants/productConstant";

const getProduct = (keyword = "", currentPage = 1, price = [0, 25000],category,rating=0) => async (dispatch) => {
  try {
    dispatch({ type: All_PRODUCT_REQUEST });

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
         
    if(category){
      link= `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
    }
    

    const { data } = await axios.get(link);

    dispatch({
      type: All_PRODUCT_SUCCESS, 
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: All_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//new Product 
const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config={
      headers:{"Content-Type":"application/json"}
    }
   
    const { data } = await axios.post(`/api/v1/admin/product/new`,productData,config);
    console.log(data);
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


//update Product 
const updateProduct = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config={
      headers:{"Content-Type":"application/json"}
    }
   console.log("Update");
    const { data } = await axios.put(`/api/v1/admin/product/${id}`,productData,config);
    
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete Product 
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
   
   
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//product detaild
const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    
    const { data } = await axios.get(`/api/v1/product/${id}`);
   
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: All_PRODUPRODUCT_DETAILS_FAILCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


//new review 
const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config={
      headers:{"Content-Type":"application/json"}
    }
   
    const { data } = await axios.put(`/api/v1/review`,reviewData,config);
    
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//admin get All product
 const getAdminProduct=()=>async(dispatch)=>{

  try {
    
    dispatch({type:ADMIN_PRODUCT_REQUEST});

    const {data} =await axios.get('/api/v1/admin/products');
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });

  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }

}

//get All review  admin
const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: All_REVIEW_REQUEST });
   
    const { data } = await axios.get(`/api/v1/reviews?id=${id}`,);
    
    dispatch({
      type: All_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: All_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete product review by admin review  admin

const deleteReviews = (reviewId,productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
   
    const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`,);
    
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//clear error
const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
export { deleteReviews,getAllReview,updateProduct,getProduct,getAdminProduct,deleteProduct,
  createProduct, clearErrors,newReview, getProductDetails };
