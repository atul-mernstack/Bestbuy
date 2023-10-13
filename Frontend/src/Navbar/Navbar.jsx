

import { React } from 'react'
import './Navbar.css'
import { AppBar, Toolbar, makeStyles, Typography, Box, withStyles } from '@material-ui/core';
import { Search } from '../component/Product/Search';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';


import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"


export const Navbar = ({isAuthenticated}) => {

  return (<>

    <nav className="navbar navbar-expand-lg navbar-light  " id="nav">
      <Link className='leftlink' to="/">
        <img src={logo} width="220" height="60" />
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className='linkwala'>
          <div className='search'><Search/></div>
          <Link className='leftlink' to="/products">Products</Link>
          <Link className='leftlink' to="/contact">ContactUs</Link>
          <Link className='leftlink' to="/cart">Cart</Link>
          
        </div>
        <div className='cart'>
        
            
            
         {
          !isAuthenticated&&(
<Link className='login1' to="/login">Login</Link>
          )
         } 
          
        </div>
      </div>
    </nav>


  </>);
} 