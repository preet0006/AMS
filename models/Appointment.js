import mongoose from "mongoose";

const appointMentSchema =  new mongoose.Schema({
     doctorName:{type:String,required:true},
     schedueledDate:{type:Date,required:true},
     reason:{type:String,required:true},
     additionalcomments:{type:String,required:true},
     cancelMessage:{type:String},

     scheduledTime: {
       type: String,
       match: /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, 
      },


     status: {
       type: String,
       enum: ["pending", "approved", "completed", "cancelled"],
      default: "pending",
     },
   
     applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
     },
      updateBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User", 
  },

 



})



export const Appointment = mongoose.models.Appointment || mongoose.model("Appointment",appointMentSchema)