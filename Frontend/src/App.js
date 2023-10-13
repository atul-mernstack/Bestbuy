
import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import WebFont from 'webfontloader'

import React from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home'
import ProductDetails from './component/Product/productDetails';
import Products from './component/Products/Products';
import { Search } from './component/Product/Search'
import LoginSignUp from './component/User/LoginSignUp'
import store from './Store'
import UserOptions from './component/layout/Header/UserOptions';
import { loadUser } from './action/userAction'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword'
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { Payment } from './component/Cart/Payment'
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails';
import ProductList from './component/Admin/ProductList';
import Dashboard from './component/Admin/Dashboard';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviws from './component/Admin/ProductReviws';
import About from './component/layout/About/About'
import Contact from './component/layout/ContactUs/ContactUs'
import PageNotFound  from './component/layout/Not Found/NotFound'
import Whatsappconnect from './component/Whatsappconnect/Whatsappconnect';
import { Navbar } from './Navbar/Navbar';



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [stripeApikey, setStripeApikey] = useState("");

  const getStripeApiKey = async () => {

    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApikey(data.stripeApiKey);

  }

  //disable right click

  window.addEventListener("contextmenu",(e)=>e.preventDefault());

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "chilanka"]
      }
    })
    //here main use of this is if user is alradey login then it should never render the
    //login and register page;
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [stripeApikey]);
  return (
    <BrowserRouter >
    
      <Navbar isAuthenticated={isAuthenticated} />
      { <Whatsappconnect/> }
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>

        <Route extact path="/" element={<Home />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails />}></Route>
        <Route extact path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route extact path="/login" element={<LoginSignUp />}></Route>
        <Route exact path="/contact" element={<Contact/>} />

        <Route exact path="/about" element={<About/>} />
        
        {isAuthenticated&& <Route exact path='/account' element={<Profile />} />
        }

        {isAuthenticated&&<Route extact path="/me/update" element={<UpdateProfile />} />}

        {isAuthenticated&&<Route extact path="/password/update" element={<UpdatePassword />} />}
 
        {isAuthenticated&&<Route extact path="/shipping" element={<Shipping />} />}

        

        {isAuthenticated && (<Route exact path="/process/payment" element={<Elements
            stripe={loadStripe(`${stripeApikey}`)}>
            <Payment />
          </Elements>} /> )}

        {isAuthenticated&&<Route extact path="/order/confirm" element={<ConfirmOrder />} />}

        {isAuthenticated&&
        <Route extact path="/orders" element={<MyOrders />} />
        }

        {isAuthenticated&&<Route extact path="/success" element={<OrderSuccess />} />}

        {isAuthenticated&&<Route extact path="/order/:id" element={<OrderDetails />} />}

       {isAuthenticated && <Route exact path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route exact path='/admin/dashboard' element={<Dashboard />} />
        </Route>}
        {isAuthenticated&&<Route exact path="/admin/products" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/products" element={<ProductList />} />
        </Route>}

        {isAuthenticated&&<Route exact path="/admin/product" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/product" element={<NewProduct />} />
        </Route>}
        {isAuthenticated&&<Route exact path="/admin/product/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>}

        {isAuthenticated&&<Route exact path="/admin/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/orders" element={<OrderList />} />
        </Route>}

        {isAuthenticated&&<Route exact path="/admin/order/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>}

        {isAuthenticated&&<Route exact path="/admin/users" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/users" element={<UsersList />} />
        </Route>}

        {isAuthenticated&&<Route exact path="/admin/user/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/user/:id" element={<UpdateUser />} />
        </Route>}

        {isAuthenticated&&<Route exact path="/admin/reviews" element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user} />}>
          <Route extact path="/admin/reviews" element={<ProductReviws />} />
        </Route>}

        {<Route extact path="/password/forgot" element={<ForgotPassword />} />}
        <Route extact path="/password/reset/:token" element={<ResetPassword />} />
        <Route extact path="/cart" element={<Cart />}></Route>

        


        <Route extact path="/search" element={<Search />}></Route>

        <Route  path="*" element={<PageNotFound />}></Route>


      </Routes>
      <Footer />
    </BrowserRouter>


  );
}

export default App;
