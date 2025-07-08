import mongoose from "mongoose";

// 1. brand model 
// 2. brand controller -> [CRUD]
// 3. routes from brand
// 4. use brand route on server.ts

// 5. update product model -> product -> add brand field -> ref. brand  collection/document 

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price must be a positive number"],
    },
    // brand:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "brand",
    //   required: [true, "brand is required"],
    // },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "category is required"],
    },

    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: [0, "stock must be a positive number"],
    },
    coverImage: {
      path: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    images: [
      {
        path: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
