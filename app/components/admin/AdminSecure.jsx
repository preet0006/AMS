'use client'

import React, { useRef, useState } from 'react'

const AdminSecure = ({verificationType,setOtp,otp,setShow,handleVerifyOtp}) => {
    

    

   

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
    

   



  return (
    <div className='flex '>
        
           <div className=' fixed  bg-black/50 backdrop-blur-xs   inset-0 flex justify-center items-center '>
          <div className=' relative bg-gray-900 p-4 py-8'>
                
              
          {
            verificationType==="admin"?(
              <div>
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
                <button onClick={()=>setShow(false)}>X</button>
            </div>

            <div className='flex p-3 flex-col w-full'>  
            <div className='flex  gap-3.5  mt-6'>
                      
                   {
                otp.map((val,idx)=>(
                 <input key={idx}  className='text-center text-3xl  bg-black w-[70px] h-[70px] outline-none'  
                  maxLength={1} 
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
                       
              <div className='w-full flex justify-center items-center mt-6 '>
                 {
                    
                  verificationType ==="admin"?(
                    <button onClick={()=>verifyPass()} className='bg-blue-800 text-white font-semibold w-full max-w-xl py-3'>Enter Admin Panel</button>
                    ):(
                     <button onClick={()=>handleVerifyOtp()} 
                      className='bg-blue-800 text-white font-semibold w-full max-w-xl py-3'>Enter Admin Panel</button>

       
                    )}
                    </div>
                

              
            </div>

          </div>


        </div>

            
           



      
    </div>
  )
}

export default AdminSecure