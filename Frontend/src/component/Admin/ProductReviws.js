import React,{useEffect,Fragment, useState}from 'react'
import "./ProductReviews.css";
import {DataGrid} from '@material-ui/data-grid';
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors,getAllReview,deleteReviews} from '../../action/productAction'
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {Botton, Button} from '@material-ui/core'
import MetaData from '../layout/MetaData'

import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import {  DELETE_REVIEW_RESET } from '../../constants/productConstant';
import Star from '@material-ui/icons/Star'




const ProductReviws  = () => {

  const dispatch =useDispatch();
const navigate=useNavigate();
  const alert =useAlert();
  const { error:deleteError,isDeleted} =useSelector((state)=>state.review);

const {error,reviews,loading} =useSelector((state)=>state.productReviews);

const[productId,setProductId] =useState("");

  const deleteReviewHandler=(reviewId)=>{
    dispatch(deleteReviews(reviewId,productId));
  
  }
  
  const productReviwSubmitHandler=(e)=>{
           e.preventDefault(); 

           dispatch(getAllReview(productId));
  }

  useEffect(()=>{
    if(productId.length===24){

        dispatch(getAllReview(productId));
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors())
    }

    if(isDeleted){
      alert.success("Review Delete Successfully");
   navigate('/admin/reviews');
 dispatch({type:DELETE_REVIEW_RESET})
    }
   // dispatch(getAdminProduct());
  },[error,alert,dispatch,getAllReview,isDeleted,productId,deleteError,navigate])
const columns=[
  {field:"id",headerName:"Review ID",minWidth:200,flex:0.5},
  {field:"user",headerName:"User" ,minWidth:200,flex:0.6},

  {field:"comment",headerName:"Comment",minWidth:350,flex:1},

  

  {field:"rating",headerName:"Rating",type:"number",minWidth:180,flex:0.4,
  cellClassName:(params)=>{

    return params.getValue(params.id,"rating")>=3?"greenColor":"redColor";
  }
},
  {field:"action",headerName:"Actions", type:"number",sortable:false, minWidth:150,flex:0.3
  
   ,renderCell:(params)=>{
    return <Fragment>
      
      <Button>
        <DeleteIcon onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}/>
      </Button>
    </Fragment>
   }

},
  
];

const rows=[];
reviews&&
reviews.forEach((item) => {
  rows.push({
    id:item._id,
    rating:item.rating,
    comment:item.comment,
    user:item.name
  })
  
});

  return <Fragment>
    <MetaData title={`ALL REVIEWS - Admin`}/>

    <div className='dashboard'>
      <SideBar/>
      <div className='productReviewsContainer'>


      <form
                    className="productReviewsForm"
                    encType="multipart/form-data"
                    onSubmit={productReviwSubmitHandler}
                >
                    <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>

                    <div>
                        <Star />
                        <input
                            type="text"
                            placeholder="Product ID"
                            required
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>
                    <button
                        id="createProductBtn"
                        type="submit"
                        className="reviewsubmitbutton"
                        disabled={loading ? true : false||productId==""?true:false}
                    >
                        Update
                    </button>
                </form>
       {
        reviews&&reviews.length>0?<DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className='productListTable'
        autoHeight
       />:
       <h1 className='productReviewsFormHeading'>No Reviews Found</h1>
    
    }

        

      </div>

    </div>
  </Fragment>

}


export default ProductReviws 