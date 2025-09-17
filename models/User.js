import mongoose, { mongo } from "mongoose";


const UserSchema =  new mongoose.Schema({
 
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    dateOfBirth:{type:Date,required:true},
    gender:{type:String,required:true},
    address:{type:String,required:true},
    occupation:{type:String,required:true},
    emergencyContactName:{type:String,default:null},    
    emergencyContactNumber:{type:String,default:null},
    
    userIdentification: {
    type: {
      type: String,
      required: true,
    },
    number: { type: String, required: true },
    document: { type: String, default: null },   
  },

  medicalRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicalRecord",
    default: null,
  },

   googleUser:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"GoogleUser",
  }
  
});
  
 
   



export const User =  mongoose.models.User || mongoose.model("User", UserSchema);
