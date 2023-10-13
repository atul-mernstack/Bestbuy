const Order = require("../Models/orderModel");

const Product = require("../Models/productModel");
const ErrorHandler = require("../utils/errorhandler");

const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        order
    })
  } catch (error) {
    return next( new ErrorHandler(error.message, 401));
  }
};

//get singl euser order.
const getSingleOrder =async(req,res,next)=>{

  try {
    
    const order =await Order.findById(req.params.id).populate("user","name email");

    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));

    }

    res.status(201).json({
      success:true,
      order
    })
  }  catch (error) {
    return next( new ErrorHandler(error.message, 401));
  }
}


//Get login user details.

const myOrders =async(req,res,next)=>{

  try {
    
    const orders =await Order.find({user:req.user._id})

   

    res.status(201).json({
      success:true,
      orders
    })
  }  catch (error) {
    return next( new ErrorHandler(error.message, 401));
  }
}


//get all Orders ---Admin

const getAllOrders = async(req,res,next)=>{

  const orders = await Order.find();

  let totalAmount=0;
  orders.forEach((order)=>{
    totalAmount+=order.totalPrice;
  })
  res.status(200).json({
    success:true,
    totalAmount,
    orders
  })
}

//Update  Order status ---Admin

const updateOrder = async(req,res,next)=>{

  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));

  }
  if(order.orderStatus=="Delivered"){
    return next("You Have Already Delivered this Order")
  }
  if(req.body.orderStatus=="Shipped"){
  order.orderItems.forEach(async(item)=>{
    await updateStock(item.product,item.quantity);
  })}
 
  order.orderStatus=req.body.orderStatus;
  
if(req.body.orderStatus=="Delivered"){
    order.deliveredAt=Date.now();
  }
 
  await order.save({validateBeforeSave:false});
  res.status(200).json({
    success:true,
   
  })
}

async function updateStock(id,quantity){

  const product =await Product.findById(id);
  product.Stock-=quantity;
  await product.save({validateBeforeSave:false});
}

//delete Orders ---Admin

const deleteOrder = async(req,res,next)=>{

  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));

  }
    await order.remove();
  res.status(200).json({
    success:true,
    
  })
}

module.exports ={deleteOrder,updateOrder,getAllOrders,newOrder,myOrders,getSingleOrder}