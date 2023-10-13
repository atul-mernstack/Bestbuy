import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors, loadUser } from "../../action/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";



const UpdateProfile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector(
    (state) => state.user
  );
  const { error, isUpdated, loading } = useSelector((state) => state.profile)



  const updateProfileSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);

    // myForm.set("avatar", avatar);
    const object={
      "name":name,
      "email":email,
      "avatar":avatar
    }
    dispatch(updateProfile(object));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const updateProfileDataChange = (e) => {

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);

  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url)
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate('/account');
      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, error, alert, history, redirect, user, isUpdated]);


  return <Fragment>
    {
      loading ? (<Loader />) :
        <Fragment>
          <MetaData title={"Update Profile"} />
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <h2 className="updateHeading">Update Profile</h2>
              <form
                className="loginForm"

                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="loginEmail">
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


                {

                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      onChange={updateProfileDataChange}
                      accept="image/*"
                       
                    />
                  </div>
                }
                <input type="submit" value="Update Profile" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>

    }
  </Fragment>
}

export default UpdateProfile