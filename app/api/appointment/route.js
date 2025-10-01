import { addAppointMent, updateAppointMent } from "@/controllers/userController";
import { connectDb } from "@/lib/connection";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authgoogle";
import { getServerSession } from "next-auth";
import GoogleUser from "@/models/GoogleUser";


export async function POST(req) {
    try {
      await connectDb()

     const session =  await getServerSession(authOptions);

     if(!session){
       return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );



    }

      const googleUserId = session.user.id

      const user= await GoogleUser.findById(googleUserId);

      if(user?.formDetails !=="true"){
      return NextResponse.redirect(`http://localhost:3000/addDetails/${googleUserId}`);
      } 
      
 
      
      const formData = await req.formData()

        const response = await addAppointMent({
             doctorName: formData.get("doctorName"),
             reason: formData.get("reason"),
             additionalcomments: formData.get("additionalcomments"),
             schedueledDate: formData.get("schedueledDate"),
             googleUserId
        });

           if(response.success){
          return NextResponse.redirect('http://localhost:3000/confirm');
         }
        

    } catch (error) {
        console.error("server error")
          return NextResponse.json(
        { success: false, message: "Server error", error: error.message },
         { status: 500 }
    );
    }
    
}

export async function PATCH(req){
  console.log(req)
    try {
        const response = await updateAppointMent(req);
        
          return NextResponse.json(response, {
          status: response.success ? 201 : 400,
         });
        
    } catch (error) {
         console.error("server error")
          return NextResponse.json(
        { success: false, message: "Server error", error: error.message },
         { status: 500 })
        
    }
}