import React from "react";
import logo from "../../../images/logo.png";
import "./Header.css";

import { ReactNavbar } from "overlay-navbar";

import { FaUserAlt,FaShoppingCart,FaSearch } from "react-icons/fa";
const Header = () => {
  return (
    
    <ReactNavbar
    navColor1="white"
   
    burgerColor="hsl(250, 100%, 75%)"
    burgerColorHover="hsl(250, 100%, 75%)"
    logo={logo}
    logoWidth="250px"
    logoHeight="100px"
    logoHoverColor="white"
    nav2justifyContent="space-around"
    nav3justifyContent="space-around"
    link1Text="Home"
    link2Text="Products"
    link3Text="Projects"
    link4Text="Contact"
    link1Url="/"
    link2Url="/products"
    link3Url="/projects"
    link4Url="/contact"
    link1ColorHover="white"
    link1Color="red"
    link1Size="1.7rem"
    link1Padding="3vmax"
    link4Padding="3vmax"
    searchIcon={true}
    SearchIconElement={FaSearch}
    searchIconColor="red"
    searchIconColorHover="white"
    cartIcon={true}
    CartIconElement={FaShoppingCart}
    cartIconColor="red"
    cartIconColorHover="white"
    profileIcon={true}
    searchIconMargin="2vmax"
    cartIconMargin="2vmax"
    profileIconMargin="2vmax"
    ProfileIconElement={FaUserAlt}
    profileIconColor="red"
    profileIconColorHover="white"
    profileIconUrl="/login"
    ></ReactNavbar>
   
  );
};

export default Header;
