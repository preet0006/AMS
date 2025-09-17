'use client'

import { useEffect, useState } from 'react'
import AdminSecure from '../admin/AdminSecure'
import { signIn } from 'next-auth/react'
import { supabase } from '@/lib/supabase'
import { useRouter } from "next/navigation";


const SignUp = () => {

  const[ email,setEmail] = useState("");
   const [otp, setOtp] = useState(Array(6).fill("")); 
   const [verificationType,setVerificationType]=useState("")

   const [confirm,setConfirm]=useState();
   const [show,setShow]=useState(false);
   

   console.log(otp)

        const handleChange=  (e)=>{
        const value = e.target.value;
    
      
       setEmail(value)
     
  }

  const handleSendOtp= async()=>{
    if(email ==""){
      return
    };

    const {data,error}=await supabase.auth.signInWithOtp({
      email})

   if (error) {
    console.log("Error sending OTP:", error.message)
  } else {
    console.log("OTP sent to email:", email)
  }


  }

  const handleVerifyOtp= async()=>{

    if(!email || !otp) {
      return
    }
    const otpCode = otp.join("");  

    const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otpCode,   
    type: "email" 
  })


  
  if (error) {
    console.error("Error verifying OTP:", error.message);
  } else {
    console.log("OTP verified, user:", data);

  }

  }




  
  const verify =(type)=>{
    setVerificationType(type)
    setShow(true);

    if (type === "email") handleSendOtp()
   }



    

  return (

    <div className='flex flex-col text-sm sm:text-base   justify-center items-center   w-full'>
      <div id="recaptcha-container"></div>
       

       <div  className='flex  gap-2 text-sm sm:text-base  mt-6 flex-col w-full'>
      <span >Name</span>
      <input className='w-full px-2.5 outline-none rounded-[6px] py-2 border border-gray-500' type="text" name="" id="" />
      
       
      <span>Email</span>
     <input onChange={(e)=>handleChange(e)} value={email} className='w-full px-2.5 outline-none rounded-[6px] py-2 border border-gray-500' type="email"  name="" id="" />

    </div>

  
     <div className=' relative justify-center items-center text-[13px] sm:text-base font-medium flex flex-col w-full'>
         <button onClick={()=>verify("email")}  className='bg-blue-800 w-full mt-6 py-2  rounded-[6px]'>Get Started</button>

       <button  onClick={() => signIn("google", { callbackUrl: "/" })} className='bg-blue-800 w-full max-w-xs mt-6 py-2 rounded-[6px] '>Sign Up with Google</button>

         <div className='absolute right-0 mt-36 sm:mt-30 text-gray-400'>
          <button onClick={()=>verify("admin")}>Admin</button>

          {
            show && (
                <AdminSecure setOtp={setOtp} otp={otp} verificationType={verificationType} setShow={setShow} handleVerifyOtp={handleVerifyOtp} />
            )
          }
        
        


         </div>

     </div>

    </div>


  )
}

export default SignUp