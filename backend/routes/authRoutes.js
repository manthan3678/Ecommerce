import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// router object
const router = express.Router();

// /router

// Register POST
router.post("/register", registerController);

//LOGIN POST
router.post("/login", loginController);
// Forgot Password
router.post("/forgot-password", forgotPasswordController);

//
router.get("/test", requireSignIn, isAdmin, testController);

// protected route   user auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// protected route for admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// Update User INFO
router.put("/profile", requireSignIn, updateProfileController);
export default router;
