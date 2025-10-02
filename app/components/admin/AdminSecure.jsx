'use client'

import React, { useEffect, useRef, useState } from 'react'
import { X } from "@deemlol/next-icons";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'


const AdminSecure = ({verificationType,setOtp,otp,setShow,handleVerifyOtp,email}) => {
    

    const [loading,setLoading]=useState(false)

    const [resendloading,setResendLoading] = useState(false)

    const [time,setTime]=useState(30)

    const router = useRouter()

    


    useEffect(() => {
    if (time <= 0) return;
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

    const inputRef = useRef([])

    const handleInput = (e,index)=>{
        const value = e.target.value;

        if (!/^[0-9]$/.test(value) && value !== "") return;

        let newOtp =[...otp];
        newOtp[index]=value;
        setOtp(newOtp)

          if (value && index < 5) {
         inputRef.current[index + 1].focus();
    }
      
    }

    const handleBack = (e,index)=>{
         if (e.key === "Backspace" && !otp[index] && index > 0) {
         inputRef.current[index - 1].focus();
    }
    }
    
    
    
   const handleResendOtp = async () => {
     if (resendloading) return;

  try {
   
    setLoading(false); 

     setResendLoading(true);
     
    
    const { data, error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.log("Error resending OTP:", error.message);
    } else {
      console.log("OTP resent successfully to:", email);
      setOtp(Array(6).fill(""));    
      setTime(30); 
    }

  } catch (err) {
    console.log(err);
  } finally {
    setResendLoading(false);
  }
};

    

   



  return (
    <div className='flex  '>
        
           <div  className=' fixed  bg-black/50 backdrop-blur-xs   inset-0 flex justify-center items-center  '>
          <div className=' relative max-w-[370px] md:max-w-2xl   bg-gray-900 p-4 py-8'>
                
              
          {
            verificationType==="admin"?(
              <div className=''>
               <h5 className='text-2xl'>Access Verification</h5>
              <p className='text-xs'>To acces the admin page,please enter the passkey....</p>
              </div>

            ):(
                <div>
               <h5 className='text-2xl'>Enter Otp</h5>
              <p className='text-xs'>Please provide otp send to your email</p>
              </div>

            )
          }


            <div className='absolute top-3 right-4'>
                <button className='cursor-pointer' onClick={()=>setShow(false)}><X size={24} color="#FFFFFF" /></button>
            </div>

              <div className='flex p-3 flex-col w-full'>  
              <div className='flex gap-2 md:gap-3.5  mt-6'>
                      
               {
                otp.map((val,idx)=>(
                 <input key={idx}  className='text-center max-w-xs
                  text-3xl  bg-black h-12 w-12 md:w-[70px] md:h-[70px] outline-none' maxLength={1} 
                  ref={(el)=>(inputRef.current[idx]=el)}
                  onChange={(e)=>handleInput(e,idx)}
                  onKeyDown={(e)=>handleBack(e,idx)}
                  type='tel'
                  pattern="[0-9]*"
                  value={val}
                 inputMode="numeric"
                 name="" id="" />
                 ))
                 }
                </div>

                {verificationType!=="admin" &&(
              <p className='text-center text-sm text-gray-400 mt-4'>
              {time > 0 ? (
                   <p>OTP expires in {time}s</p>
              ):(
                 <div>
                    <p>You can resend OTP now</p>
                    
                    <button 
                      onClick={()=>handleResendOtp()}
                      className="text-blue-600 cursor-pointer underline"
                    >
                       
                       {
                       resendloading?(
                      <div className="w-5 h-5 flex items-center justify-center border-2
                       border-white border-t-transparent rounded-full animate-spin"></div>
                     ):(
                        "Resend OTP"

                     )}
                    
                    </button>
                  </div>

              )}


              
            </p>

                )
                
                }

            

                
                       
              <div className='w-full flex justify-center items-center mt-6 '>
                 {
                    
                  verificationType ==="admin"?(

                    
                    <button onClick={()=>router.push('/admin')} className='bg-blue-800 cursor-pointer text-white font-semibold w-full max-w-xl py-3'>Enter Admin Panel</button>
                    ):(
                <button onClick={async () => { setLoading(true);        
                   await handleVerifyOtp();  setLoading(false);      
                  }}
                      disabled={loading}
                       className='bg-blue-800 flex items-center justify-center cursor-pointer text-white font-semibold w-full max-w-xl py-3'
>
                 {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                     "Enter"
                      )}
                    </button>


       
                    )}
                    </div>
                

              
            </div>

          </div>


        </div>

            
           



      
    </div>
  )
}

export default AdminSecure