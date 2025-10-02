'use client'

import { useCallback, useEffect, useState } from 'react'
import AdminSecure from '../admin/AdminSecure'
import { signIn } from 'next-auth/react'
import { supabase } from '@/lib/supabase'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
import { debounce, flatMap } from 'lodash'
import OtpDrop from './OtpDrop'



const SignUp = () => {

       
          const [name,setName]=useState('')
         const[ email,setEmail] = useState("");
          const [otp, setOtp] = useState(Array(6).fill("")); 
          const [verificationType,setVerificationType]=useState("")
          const [loading,setLoading]=useState(false);

          const [otpErr,setOtpErr]=useState(false)
          
       
          const [emailerr,setEmailErr]=useState(false)
          
          
       
           const debouncedSetEmail = useCallback(
           debounce((value) => setEmail(value), 100),
           []
         );
       
       
          const [show,setShow]=useState(false);
          
          const router = useRouter()
       
      
       
       
       
         const handleSendOtp= async()=>{
           
           if(loading){
             return
           }
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

           try {
             if(!emailRegex.test(email)){
               setEmailErr(true);
                return 
             }else{
                setEmailErr("");
               setShow(true)
             }
         
             const {data,error}=await supabase.auth.signInWithOtp({
               email})
         
            if (error) {
               console.log("Error sending OTP:", error.message);
            
           } else {
               console.log("OTP sent to email:", email);
           }
            } catch (error) {
              console.log(error)
           }}
       
            const handleVerifyOtp = async () => {
        
              const otpCode = otp.join("");
          
              if (!otpCode || otpCode.length < 6 || otp.includes("")) {
              
                setLoading(false)
                return;
                }
            
         try {      
             setLoading(true)
           
              const res = await signIn("email-otp", {
              email,
              otp: otpCode,
              name,
              redirect: false, 
              });
          
              if (res?.error) {
                console.error("NextAuth signIn failed:", res.error);
                setOtpErr(true)
                
                return;
              }
          
             setOtpErr(false)
             router.push("/");
           } catch (err) {
             console.log(err, "in verify");
           
           } finally{
            setLoading(false)
           }
         };
           
           
          const verify =(type)=>{
        if(loading) return
         setVerificationType(type)
        if (type === "email") handleSendOtp()
          }


   

  return (

    <div className='flex flex-col text-sm sm:text-base   justify-center items-center   w-full'>
      <div id="recaptcha-container"></div>
       
       {
        otpErr&& (
          <OtpDrop setOtpErr={setOtpErr}/>
        )
       }

       <div  className='flex  gap-2 text-sm sm:text-base  mt-6 flex-col w-full'>
      <span >Name</span>
      <input onChange={(e)=>setName(e.target.value)}  value={name} className='w-full px-2.5 outline-none rounded-[6px] py-2 border border-gray-500' type="text" name="" id="" />
      
       
      <span>Email</span>
     <input onChange={(e)=>debouncedSetEmail(e.target.value)} value={email}
     className='w-full px-2.5 outline-none rounded-[6px] py-2 border border-gray-500'
      type="email"   name="" id="" />

      {emailerr &&(
        <p className='text-red-400 text-xs'>Please provide a valid email address</p>
        )}

    </div>

  
     <div className=' relative justify-center items-center text-[13px] sm:text-base font-medium flex flex-col w-full'>
         <button onClick={()=>verify("email")}  
         className='bg-blue-800 cursor-pointer w-full mt-6 py-2  rounded-[6px]'>Get Started</button>

       <button  onClick={() =>{
       setLoading(true)
       signIn("google", { callbackUrl: "/" })} }
       className='bg-blue-800 w-full flex justify-center cursor-pointer items-center max-w-xs mt-6 py-2 rounded-[6px] '>
        {
          loading?(
            
            <div className="w-5 h-5 flex items-center justify-center border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ):(
            <div className='flex gap-2 justify-center items-center flex-1'>
              <img className='w-6' src="/gg.png" alt="" />
               Sign Up with Google
            </div>
           
          )
        }
       </button>

         <div className='absolute right-0 mt-36 sm:mt-30 text-gray-400'>
          <button onClick={()=>verify("admin")}>Admin</button>

          {
            show && (
                <AdminSecure email={email} setOtp={setOtp} otp={otp} verificationType={verificationType}
                 setShow={setShow} handleVerifyOtp={handleVerifyOtp} />
            )
          }
        
       </div>
         </div>
           </div>


  )
}

export default SignUp