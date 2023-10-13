import React, { Fragment, useRef, useState, useEffect } from "react";
//import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors, loadUser } from "../../action/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";


const UpdatePassword = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector(
    (state) => state.user
  );
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [OldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const updatedata = {
    "OldPassword": OldPassword,
    "newPassword": newPassword,
    "confirmPassword": confirmPassword
  }
  const updateFunction = (e) => {
    e.preventDefault();
    
    console.log(updatedata)
    dispatch(updatePassword(updatedata));
  }

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      dispatch(loadUser());
      navigate('/');
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, error, alert, history, user, isUpdated, updateFunction]);


  return <Fragment>
    {
      loading ? (<Loader />) :
        <Fragment>
          <MetaData title={"Update Password"} />
          <div className="LoginSignUpContainer">
            
          <div className="LoginSignUpBox">
          <h2 className="updateHeading">Update Password</h2>
            <form className="loginForm" onSubmit={updateFunction}>
              <div className="loginPassword">
              
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={OldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Update Password" className="signUpBtn"  />
            </form>
            </div>
          </div>
        </Fragment>
    }
  </Fragment>
}
export default UpdatePassword;