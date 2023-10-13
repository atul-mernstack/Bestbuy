const User = require("../Models/userModel");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../utils/errorhandler");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary');

const reigsterUser = async (req, res, next) => {
  try {

     
  
     let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: 'scale'
      })

    const { name, email, password } = req.body;
            
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
      
    });
    console.log(user);
    const token = user.getJWTToken();
    //creating cookies
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    //sending welcom mail to user
    const message = `Hi ${user.name} Welcome to You on this amazing Ecommerce Website  `;

    //calling send mail function.
    await sendEmail({
      email: user.email,
      subject: `Welcome Mail`,
      message,
    });
   
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

//Login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //checking if given email and password match

    if (!email || !password) {
      return next(new ErrorHandler("Please Entre Email & Password ", 404));
    }

    //checkinf both user and password
    //here select method require to get password also because in User model select false for password so we have to use select function to slect it.
    let user = await User.find({ email }).select("+password");
    //it return a array
    user = user[0];
    //if User not found
    if (!user) {
      return next(new ErrorHandler("INVALID USER OR PASSWORD", 401));
    }
    //console.log((user.password));
    //matchig pass word
    const isPasswordatched = await bcryptjs.compare(password, user.password);

    //if not match
    if (!isPasswordatched) {
      return next(new ErrorHandler("INVALID USER OR PASSWORD", 401));
    }

    //if match
    //getting JWT token
    const token = user.getJWTToken();
    //creating cookies
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//logout user
const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "LogOut",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Forgate Password.

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  //If user not found.
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //console.log(user)
  //Get RestToken token
  //console.log("get User1")
  const resetToken = user.getResetPasswordToken();
  //console.log(resetToken)

  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested thsi email 
  then please ignore it `;

  try {
    //calling send mail function.
    await sendEmail({
      email: user.email,
      subject: `Wcommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
};

//reset password

const resetPassword = async (req, res, next) => {
  try {
    //creating hash token
    //console.log("hello");
    //console.log(req.body.passworddata)
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler("Reset Password token is invalid time expire", 404)
      );
    }

    if (req.body.passworddata.password !== req.body.passworddata.confirmPassword)
      return next(new ErrorHandler("Password does not match", 404));

    user.password = req.body.passworddata.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    //updating cookies
    const token = user.getJWTToken();
    //creating cookies
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Get User Detais

const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//to update old password

const passwordUpdate = async (req, res, next) => {
  try {
    // console.log("hello");
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordatched = await bcryptjs.compare(
      req.body.OldPassword,
      user.password
    );
    //if not match
    if (!isPasswordatched) {
      return next(new ErrorHandler("ILD Password Is invalid", 400));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      return next(new ErrorHandler("Password DOES NOT MATCH", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    //updating cookies
    const token = user.getJWTToken();
    //creating cookies
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user Profile
const updateUserProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };


    //cloudinary

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

///////////////FOR ADMIN///////////////////////////////
//To see number of user for (Admin)

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//To see setails of user for (Admin)

const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
   //console.log(user)
    if (!user) {
      return next(
        new ErrorHandler("User does not exist with id " + req.params.id)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Update user Role ADMIN
const updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      message: "User Role Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete user  ADMIN
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler("User does not exist with id " + req.params.id)
      );
    }
   

    //we will add cloudinary later
    
     

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      await user.remove();
    res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  deleteUser,
  updateUserRole,
  getSingleUser,
  updateUserProfile,
  passwordUpdate,
  reigsterUser,
  getUserDetails,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getAllUser,
};
