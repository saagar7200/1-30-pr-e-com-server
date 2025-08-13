

// brand model 
// 1.name (required)
// 2. description (optional)
// 3. logo (optional)

// create mongoose schema
// create mongoose model form brand

// models/brand.model.ts
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true,
    },
    logo: {
      path: { type: String },
      public_id: { type: String }
    }
  },
  { timestamps: true }
);

const Brand = mongoose.model("brand", brandSchema);

export default Brand;
