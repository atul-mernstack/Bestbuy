import React, { Fragment, useRef, useState, useEffect } from "react";

import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import './ForgotPassword.css'
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {  forgotPassword ,clearErrors} from "../../action/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant"; 
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {



    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();
  
    
    const { error, message, loading } = useSelector((state) => state.forgotPassword)
  
    const [email, setEmail] = useState("");
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      dispatch(forgotPassword(email));
    };
  
    
    
    
    
     
  
   
  
    useEffect(() => {
      
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        alert.success(message);
       
      }
    }, [dispatch, error, alert,message]);
  return <Fragment>
  {
    loading ? (<Loader/>):(
    <Fragment>
    <MetaData title={"Forgot Password"} />
    <div className="forgotPasswordContainer">
      <div className="forgotPasswordBox">
        <h2 className="updateHeading">Forgot Password</h2>
        <form
          className="forgotPasswordForm"
  
          
          onSubmit={forgotPasswordSubmit}
        >
         
          <div className="forgotPasswordEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              name="email"
  
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
  
          
          <input type="submit" value="Send" className="forgotPasswordBtn" />
        </form>
      </div>
    </div>
  </Fragment>
    )
  }
  </Fragment>
}

export default ForgotPassword