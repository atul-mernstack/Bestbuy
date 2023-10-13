const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const express = require("express");
const {
  reigsterUser,
  loginUser,
  logoutUser,
  forgotPassword,
  passwordUpdate,
  resetPassword,
  getUserDetails,
  updateUserProfile,
  getSingleUser,
  getAllUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(reigsterUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);

//user profile details
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, passwordUpdate);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)

module.exports = router;
