import{createStore,combineReducers,applyMiddleware} from'redux';
import thunk from 'redux-thunk'
import {cartReducer} from './reducers/cartReducer'
import{composeWithDevTools} from 'redux-devtools-extension';
import {productsReducer,newProductReducer,productDetailsReducer,newReviewReducer, productReducer, productReviewsReducer, reviewReducer} from './reducers/productReducer';
import {profileReducer, userReducer,forgotPasswordReducer, allUsersReducer, userDetailsReducer}  from "./reducers/userReducer";
import {allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, OrderReducer } from './reducers/orderReducer'
import { getAllReview } from './action/productAction';



const reducer =combineReducers({ 

    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:OrderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer

    

    
});

let initialState={
   //don't keep initial state empty 
   //if data is exist in local sorage mean cart item exist the take from local stroage 
   //other wise keep empty
    cart:{
        cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo:localStorage.getItem("shippingInfo")
      ?JSON.parse(localStorage.getItem("shippingInfo"))
      :{},
    }
};
const middleware =[thunk];

const store =createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

