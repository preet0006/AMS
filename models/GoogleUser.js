
import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      
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

     formDetails:{
      type:String,
      enum:["true","false"],
      default:"false"
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
