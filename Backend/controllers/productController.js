const Product = require("../Models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require('cloudinary')
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../config/apifeatures");

//create Product --Admin Route
const createProduct = async (req, res, next) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];



    for (let i = 0; i < images.length; i++) {
      try {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
       // console.log("ERROR IN CREATE PRODUCT"+error.message);
      }



    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
    next();
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

//Get All Product
const getAllProducts = async (req, res, next) => {
  try {

    const resultperpage = 20;
    const productCount = await Product.countDocuments();

    const apifeature = new Apifeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultperpage);
 
    const products = await apifeature.query;
    
    res.status(200).json({ success: true, products, productCount, resultperpage });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

//Get All Product Admin
const getAdminProducts = async (req, res, next) => {
  try {

    const products = await Product.find();

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Product Details

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Poduct Not Found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Product -- Admin

const updateProduct = async (req, res, next) => {
  try {
    let product = Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    if (images !== undefined) {
      //Delete image from cloudinary that all ready exist
      try {
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
      } catch (error) {
       // console.log(error.message);
      }
    }
    const imagesLinks = [];


     
    for (let i = 0; i < images.length; i++) {
      try {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
       // console.log(error.message);
      }



    }
    //console.log("2");

    req.body.images = imagesLinks;


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }

}
//Delete Product -- Admin

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
      try {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      } catch (error) {
      //  console.log(error.message)
      }


    }




    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfullu",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

//Cretae New Review or Update the review

const createProductReview = async (req, res, next) => {

  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };


    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if ((rev) => rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);

      product.numOfReviews = product.reviews.length;
    }

    //finding over all rating
    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    })

    product.ratings = avg / product.reviews.length;
    //console.log(product.ratings);

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

//get All Reviews of Product

const getProductReviews = async (req, res, next) => {

  try {


    const product = await Product.findById(req.query.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(201).json(
      {
        success: true,
        reviews: product.reviews,
      }
    )


  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }

}

//Delete review
const deleteReviews = async (req, res, next) => {

  try {


    const product = await Product.findById(req.query.productId);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    //req.query.is is comment/rating _id
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    })

     let  ratings =0;
   if(reviews.length>0)
    {ratings = avg / reviews.length;}


    const numofReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numofReviews
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    })



    res.status(201).json(
      {
        success: true,

      }
    )


  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }

}
module.exports = {
  deleteReviews,
  createProductReview,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getProductReviews,
  getAdminProducts
};
