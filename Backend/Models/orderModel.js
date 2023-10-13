const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
   
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,

      default: "India",
    },
    pinCode: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        require: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  paidAt: {
    type: Date,
    requied: true,
  },
  itemsPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    require: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = new mongoose.model("Order", orderSchema);
module.exports=Order;
