import express from "express";
const router = express.Router();
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  filterController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountContoller,
  productListController,
  productPhotoController,
  relatedProductController,
  searchController,
  updateProductController,
} from "../controllers/productController.js";
// file k liye formidable
import formidable from "express-formidable";
//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// get products
router.get("/get-product", getProductController);
// signle pructs
// product ka slug pass krna pdhega
router.get("/get-product/:slug", getSingleProductController);
// get photo
// product k id k basis pr photo lenge
router.get("/product-photo/:pid", productPhotoController);
// delete product
router.delete("/product-delete/:pid", deleteProductController);
// update Route idk basis pr
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
// Filter Product
router.post("/product-filter", filterController);
// product count
router.get("/product-count", productCountContoller);
// product per page
router.get("/product-list/:page", productListController);
// search product
router.get("/search/:keyword", searchController);
// similar product routes
router.get("/related-product/:pid/:cid", relatedProductController);
// category wise product
router.get("/product-category/:slug", productCategoryController);
export default router;
