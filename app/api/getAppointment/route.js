import { getStatus } from "@/controllers/userController";
import { connectDb } from "@/lib/connection";
import { authOptions } from "@/lib/authgoogle";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
     
        await connectDb()
        const session = await getServerSession(authOptions);
        

            if(!session){
               return NextResponse.json(
              { success: false, message: "Server error" },
              { status: 500 }
            );
        }

         const googleUserId = session.user.id;


         const response = await getStatus(googleUserId);
          
        



        return NextResponse.json(response, {
          status: response.success ? 201 : 400,
         });
        


    } catch (error) {
        console.error("server error")
          return NextResponse.json(
        { success: false, message: "Server error", error: error.message },
         { status: 500 }
    );
    }

}