import React, { Fragment, useRef, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors, loadUser } from "../../action/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";

const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);


    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const passwordata = {

        "password": password,
        "confirmPassword": confirmPassword
    }
    const updateFunction = (e) => {
        e.preventDefault();

       
        dispatch(resetPassword(token, passwordata));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            navigate('/login');

        }
    }, [dispatch, error, alert, success, updateFunction]);

    return <Fragment>
        {
            loading ? (<Loader />) :
                <Fragment>
                    <MetaData title={"Update Password"} />
                    <div className="resetPasswordContainer">

                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Update Password</h2>
                            <form className="resetPasswordForm" onSubmit={updateFunction}>



                                <div >
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div >
                                     <LockIcon/>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Update "  className="resetPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
        }
    </Fragment>
}

export default ResetPassword