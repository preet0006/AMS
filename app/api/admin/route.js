import { getAdminStats } from "@/controllers/adminController";
import { NextResponse } from "next/server";



export async function GET(req) {
    try {
        const response = await getAdminStats()

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