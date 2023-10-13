import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToApp from "@material-ui/icons/ExitToApp";
import PersonIcon from '@material-ui/icons/Person'
import ListAltIcon from "@material-ui/icons/ListAlt"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import { useNavigate}from 'react-router-dom'
import { useAlert } from "react-alert";
import { useDispatch,useSelector}from 'react-redux'
import { logout } from '../../../action/userAction';
import './Header.css';
import {Backdrop} from '@material-ui/core'




const UserOptions = ({user}) => {


const dispatch =useDispatch();

const {cartItems} =useSelector((state)=>state.cart)

  const alert = useAlert();
  const [open,setOpen] = useState(false);
const navigate =useNavigate();
 

//creating the function
const dashboard=()=>{
     navigate('/admin/dashboard');
}
const orders=()=>{
  navigate('/orders');
}
const account=()=>{
  navigate('/account');
}
const cart=()=>{
  navigate('/cart');
}
const logoutUser=()=>{
  dispatch(logout());
  navigate("/")
  alert.success("Logout successfully!!!!");
}
const options=[
  {icon:<ListAltIcon/>, name:"Orders",func:orders},
  {icon:<PersonIcon/>, name:"Profile", func:account},
  {icon:
  <ShoppingCartIcon
    style={{color:cartItems.length>0?"tomato":"unset"}}
  />
  , name:`Cart(${cartItems.length})`, func:cart},
  {icon:<ExitToApp/>,name:"Logout",func:logoutUser}
]
//if role of user is admin then show dashboard
if(user.role==="admin"){
options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard})
}

  return <Fragment>
    <Backdrop open={open}  style={{zIndex:"10"}}/>
    <SpeedDial
    className='speedDial'
      ariaLabel='SpeedDial tooltip example'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      direction="down"
      style={{zIndex:"11"}}
      open={open}
      icon={
        <img className='speedDialIcon' src={user.avatar.url?
        user.avatar.url:"./Profile.js"} alt="profile"/>
      }
    >

      {options.map((option)=>(<SpeedDialAction key={option.name} icon={option.icon} tooltipOpen tooltipTitle={option.name} onClick={option.func}/>))}

    </SpeedDial>

  </Fragment>


}

export default UserOptions