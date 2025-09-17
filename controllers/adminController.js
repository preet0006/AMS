
import { connectDb } from "@/lib/connection";
import { Appointment } from "@/models/Appointment"
import { User } from "@/models/User";
import { NextResponse } from "next/server";




export const getAdminStats = async(req,res)=>{
   try {
      const stats = await Appointment.aggregate([
      {
      $match: { status: { $ne: "completed" } },
      },
         {
         $group:{
            _id:"$status",
            total:{$sum:1}
         }
         }
      ])

    const result = {
      pending: 0,
      approved: 0,
      cancelled: 0,
       };

       stats.forEach((item)=>{
       result[item._id] = item.total
       })

  return result

   } catch (error) {
      console.log(error)
      
   }
}


export const sendAdminData = async(req,res)=>{
   try {
       await connectDb()
     const findAppointMents =  await Appointment.find({status:"pending"}).populate("applicant", "fullName email phoneNumber");
       
    const stats =  await getAdminStats()
     
     
     if(!findAppointMents){
        return {success:false,message:"something went wrong"}
     }

     return {success:true,data:{
      findAppointMents,
      stats

     }}

   } catch (error) {
    console.log(error)
    
   }

};
