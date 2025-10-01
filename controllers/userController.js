import { connectDb } from "@/lib/connection";
import pusher from "@/lib/pusher";
import { Appointment } from "@/models/Appointment";
import GoogleUser from "@/models/GoogleUser";
import { MedicalRecord } from "@/models/MedicalRecords";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";



export const addUserDetails = async(req,res)=>{
try {
  
        await connectDb()
        

        
        const {personalInfo,medicalInfo,primaryPhysician,identification,fileUrl,userId }= req.body;
        console.log(userId)

    
    
        const verify =  await User.findOne(
          {
           $or:[
           {"phoneNumber":personalInfo.phone},
           { email: personalInfo.email }
          ]
           }
        );
    
        if(verify){
             return { success: false, message: "User already exists" };
        }
    
     const newUser = await User.create({
          fullName: personalInfo.fullName,
          email: personalInfo.email,
          phoneNumber: personalInfo.phone,
          dateOfBirth: personalInfo.dob,
          gender: personalInfo.gender,
          address: personalInfo.address,
          occupation: personalInfo.occupation,
          emergencyContactName: personalInfo.emergencyName,
          emergencyContactNumber: personalInfo.emergencyNumber,
    
          userIdentification: {
            type: identification.identificationType,
            number: identification.idNumber,
            document:fileUrl
          },
           googleUser:userId
        });

     //user id  here are added to google user id 

       const googleUser = await GoogleUser.findByIdAndUpdate(userId,
        {user:newUser._id, formDetails:"true"},{new:true})

     
        const newMedicalRecord = await MedicalRecord.create({
            user: newUser._id, 
           primaryCarePhysician: primaryPhysician,   
           insuranceProvider: medicalInfo.insuranceProvider,
           insurancePolicyNumber: medicalInfo.insurancePolicyNumber,
           allergies: medicalInfo.allergies,
           currentMedications: medicalInfo.currentMedications,
           familyMedicalHistory: medicalInfo.familyMedicalHistory,
           pastMedicalHistory: medicalInfo.pastMedicalHistory,
         });
    
        newUser.medicalRecord = newMedicalRecord._id;
        await newUser.save();

          const updatedUser = await GoogleUser.findByIdAndUpdate(
                userId, 
             { formDetails: "true" }, 
            { new: true } 
        );
        
        
        
        return {
         success: true,
         message: "User and Medical Record created successfully",
         user: newUser.toObject(),
         medicalRecord: newMedicalRecord.toObject(),
      };

        } catch (error) {
        console.log(error)
        return { success: false, message: error.message };
    
}
}

export const addAppointMent=async(data)=>{
try {

    const { doctorName, schedueledDate, reason, additionalcomments, googleUserId } = data;
  
    if(!doctorName || !schedueledDate || !reason || !additionalcomments  ){
       return { success: false, message: "one or more field is missing"};
    }  
    
     //here i will find user id from the googleuser and then add it to new appointment that id 
      const googleUser = await GoogleUser.findById(googleUserId).select("user");

  
     
    const checkPendingAppointment = await Appointment.exists({
      applicant:googleUser,
      status:"approved"
    })
  
    if(checkPendingAppointment){
      return { success: false, message: "user already have and appointment"};
    }
    
   
  
    const newAppointMent = await Appointment.create({
           doctorName,
           schedueledDate,
           reason,
           additionalcomments,
           status:"pending",
           applicant: googleUser.user
           
      
    })

 return {  success: true,message: "Appointment created successfully",data: newAppointMent,};
    
} catch (error) {
  console.log(error)
}


}


  export const updateAppointMent = async (req,res)=>{
    


     try {
      const {type,userId,appointmentId,time,cancelMessage}= await req.json();
      console.log("Received Data:", { type, userId, appointmentId,time,cancelMessage });

      const {_id,fullName,email,phoneNumber} = userId;

       
       if(!type){
        return { success: false, message: "one or more field is missing"};
       }

       const isValid = await Appointment.findOne({ _id: appointmentId});

        if(!isValid){
          return { success: false, message: "user id not found"};
        }
      
       const googleUser = await GoogleUser.findOne({ user: _id });
      
  
      let updateData = {}
    
      if(type==="granted"){
        updateData={
          status:"approved",
          updateBy: _id,
          scheduledTime:time
        }
      }
    
      if(type=="cancelled"){
        updateData={
          status:"cancelled",
           updateBy: _id,
          cancelMessage: cancelMessage || "",
        }
      }
    
      if(type =="completed" ){
           updateData={
           status:"completed",
           updateBy: _id,
        }
    
      }


      if(type ==="granted" && googleUser){
        await pusher.trigger(`user-${googleUser._id}`, "appointmentGranted", {
          googleUserId:googleUser._id,
          time
        })
      }
  
      

    const appointment = await Appointment.findByIdAndUpdate(
           appointmentId,updateData, { new: true }
      );
      
    
         if(!appointment){
           return { success: false, message: "something went wrong"};
         }

   

  
       return {
        success: true,
        message: "Appointment updated successfully",
        data: appointment,
      };
       } catch (error) {
         
        console.log(error)
    }
   }


 export const getStatus = async (id) => {
    console.log("Received ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID");
        return { success: false, message: "Invalid user ID" };
    }

    try {
        
        const user = await GoogleUser.findById(id);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        console.log(user)

        const appointment = await Appointment.findOne({ applicant: user.user._id });
        if (!appointment) {
            return { success: false, message: "No appointment found" };
        }
        console.log(appointment)

        const { doctorName, scheduledTime } = appointment
        return { success: true, data: { doctorName, scheduledTime } };

    } catch (error) {
        console.error(error);
        return { success: false, message: "Internal server error" };
    }
};
