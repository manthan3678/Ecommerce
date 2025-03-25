import slugify from "slugify";
import productModel from "../model/productModel.js";
import categoryModel from "../model/categoryModel.js";
import orderModel from "../model/usermodel.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
// payment
import braintree from "braintree";
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});
//
//create product
export const createProductController = async (req, res) => {
  try {
    // fields me data get krege formadilabe use krre isliye
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //   switch statement validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is require",
        });
      case !description:
        return res.status(500).send({
          error: "description is require",
        });
      case !category:
        return res.status(500).send({
          error: "category is require",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is require",
        });
      case !price:
        return res.status(500).send({
          error: "price is require",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "photo is require less them 1mb",
        });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in creating product",
      error,
    });
  }
};
// %%%%%%%%%%%%% get product %%%%%%%%%%%%%%%%
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      total: products.length,
      message: "All product get succesfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in getting product",
    });
  }
};
// $$$$$$$$$$$$ single product controller $$$$$$$$$$$$$
export const getSingleProductController = async (req, res) => {
  try {
    const products = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    return res.status(200).send({
      success: true,
      message: "Single Product fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in single product controller",
      error,
    });
  }
};
//********* */ get photo ***********
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Getting Photo",
      error,
    });
  }
};
// !!!!!!!!!!!!! delete product !!!!!!!!!!!!
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While deleting",
      error,
    });
  }
};
// ############# update controller ###########
export const updateProductController = async (req, res) => {
  try {
    // fields me data get krege formadilabe use krre isliye
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //   switch statement validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is require",
        });
      case !description:
        return res.status(500).send({
          error: "description is require",
        });
      case !category:
        return res.status(500).send({
          error: "category is require",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is require",
        });
      case !price:
        return res.status(500).send({
          error: "price is require",
        });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "photo is require less them 1mb",
        });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).send({
      success: true,
      message: "Product update successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in updating product",
      error,
    });
  }
};
// !!!!!!!!!!!!!! filter controller !!!!!!!!!!!!!!!!
export const filterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    return res.status(200).send({
      success: true,
      message: "Product Filter",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in filter controller",
      error,
    });
  }
};
// product COunt
export const productCountContoller = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    return res.status(200).send({
      success: true,
      message: "Product Count Success",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in pagination or product count",
      error,
    });
  }
};
// Product to be shown
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "ture in perpage",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Per Page",
      error,
    });
  }
};
// Search Product Controller
export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(200).send({
      error,
      success: false,
      message: "error in search controller",
    });
  }
};
// Similar/Related Product Controller
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    return res.status(200).send({
      success: true,
      message: "SImilar products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Related Product Controller",
    });
  }
};
// productCategoryController
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    return res.status(200).send({
      success: true,
      category,
      products,
      message: "Product Category Controller",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in product category controller",
      error,
    });
  }
};

// !!!!!!!!!! PAYMENT SECTION !!!!!!!!!!!!!
// token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).send({
          message: "error in gateway token",
          err,
        });
      } else {
        return res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// payment
export const paymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;

    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          return res.json({ ok: true });
        } else {
          return res
            .status(500)
            .send({ message: "Error on Brantree payment controlletr", error });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
