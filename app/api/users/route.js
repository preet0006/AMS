import { NextResponse } from "next/server";
import { addUserDetails } from "@/controllers/userController";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { authOptions } from "@/lib/authgoogle";
import { getServerSession } from "next-auth";


export const runtime = "nodejs";

export async function POST(req) {
  try {

    const session =  await getServerSession(authOptions)
     console.log(session)
     
    if(!session){
       return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );

    }
    
    const userId = session.user.id
    
    console.log(userId)
   

    const formData = await req.formData();

    const file = formData.get("file");
    const fileUrl = await uploadToCloudinary(file);

    const personalInfo = JSON.parse(formData.get("personalInfo"));
    const medicalInfo = JSON.parse(formData.get("medicalInfo"));
    const identification = JSON.parse(formData.get("identification"));
    const primaryPhysician = formData.get("primaryPhysician");

    const response = await addUserDetails({
      body: { personalInfo, medicalInfo, primaryPhysician, identification, fileUrl,userId },
    });

    return NextResponse.json(response, {
      status: response.success ? 201 : 400,
    });
  } catch (error) {
    console.error("User POST error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

