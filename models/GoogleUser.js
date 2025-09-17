
import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, 
    },
    image: {
      type: String,
    },

    phoneNumber:{
      type:String,
    },

     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
      },

  { timestamps: true } 
);


export default mongoose.models.GoogleUser ||
  mongoose.model("GoogleUser", GoogleUserSchema);
