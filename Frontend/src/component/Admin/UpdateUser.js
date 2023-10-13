import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import PersonIcon from "@material-ui/icons/Person";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Loader from '../layout/Loader/Loader'
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import { getUserDetails, updateUser ,clearErrors} from "../../action/userAction";

const UpdateUser = () => {

    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);
       
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");



    useEffect(() => {
        
        
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

        }


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(error);
            dispatch(updateError());
        }
        if (isUpdated) {
            alert.success("User Updated Successfully");
            history("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, history,isUpdated,updateError,user,id]);



    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const updateUserData = {
            "name": name,
            "email": email,
            "role": role,

        }


        dispatch(updateUser(id, updateUserData));
    };


    return <Fragment>
        <MetaData title="Create Product" />
        <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
                {
                    loading?<Loader/>:(
                        <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateUserSubmitHandler}
                >
                    <h1>Update User</h1>

                    <div>
                        <PersonIcon />
                        <input
                            type="text"
                            placeholder=" Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>





                    <div>
                        <VerifiedUserIcon />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value=" ">Choose Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            



                        </select>
                    </div>


                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={updateLoading ? true : false||role==""?true:false}
                    >
                        Update
                    </Button>
                </form>
                    )
                }
            </div>
        </div>
    </Fragment>
}

export default UpdateUser