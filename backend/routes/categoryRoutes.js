import express from "express";
const router = express.Router();
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import {
  categoryController,
  createcategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
// routes
// create
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createcategoryController
);
// update
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
// get all category
router.get("/getcategory", categoryController);

// single category
router.get("/single-category/:slug", singleCategoryController);
// // delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
