import SignUp from '@/app/components/authentications/SignUp'
import React from 'react'

const page = () => {
  return (
    <>
   
    <div className='flex items-center sm:justify-center    flex-col m-auto h-dvh w-full  '>

          <div className='w-full sm:hidden mt-12 flex justify-center items-center'>

         
         <img className='h-32 w-32' src="./dc12.png" alt="" />
          </div>

       
         
      <div className='flex  mt- justify-center items-center  flex-col  w-full max-w-xl px-6  sm:px-4'>
          <div className='flex px-4 sm:px-8  mt-4  items-start  w-full  flex-col gap-2'>  
         <h4 className=' text-xl sm:text-4xl font-medium'>Hey There!!</h4>
            <p className='text-xs sm:text-sm text-gray-400'>Get Started with Appointments</p>

      </div>
        

         <div className=' flex  justify-center items-center max-w-96 sm:max-w-xl px-3 sm:px-12 w-full'>
        
        <SignUp/>
        

      </div>

      </div>



   

    </div>
     </>
  )
}

export default page