import mongoose from "mongoose";

const medicalRecords = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    primaryCarePhysician:{type:String},
    insuranceProvider:{type:String,default:null},
    insurancePolicyNumber:{type:String,default:null},
    allergies:{type:String,default:null},
    currentMedications:{type:String,default:null},
    familyMedicalHistory:{type:String,default:null},
    pastMedicalHistory:{type:String,default:null},
    
    

},{timestamps:true})

export const MedicalRecord =  mongoose.models.MedicalRecord || mongoose.model("MedicalRecord", medicalRecords);