import React from 'react'

const SignIn = () => {
  return (
  
    <div className='flex flex-col w-full max-w-2xl'>

       <div className='flex  gap-2  mt-6 flex-col w-full'>
      
   
      <span>Phone Number</span>
     <input className='w-full outline-none rounded-[6px] py-2 border border-gray-500' type="text" name="" id="" />

    </div>

  
     <div className=' relative w-full'>
         <button className='bg-blue-800 w-full mt-6 py-2 rounded-[6px]'>Verify</button>
       

     </div>

    </div>

  )
}

export default SignIn