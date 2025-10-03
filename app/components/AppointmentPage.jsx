import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authgoogle'
import { docs } from '@/constant'
import DoctorDrop from './DoctorDrop'
import Test from './Test'



const AppointmentPage = async() => {
    
  // const session = await getServerSession(authOptions)
  // console.log(session);
  
  

  


  return (
    <div className='flex text-sm sm:text-base   w-full  px-16 z-10 '>

        <div className='flex   w-full flex-col'>

          <div className='flex flex-col   mt-10 sm:mt-14 gap-1 sm:gap-3'>
            <h4 className=' text-xl sm:text-4xl font-medium'>Hey There</h4>
            <p className=' text-xs  sm:text-[15px] text-gray-400'>Request a appointment</p>
        </div>
        
         <form action="/api/appointment" method="POST">

           <div className='flex  gap-2 flex-col  mt-5 sm:mt-10 w-full max-w-screen  sm:max-w-2xl'>
           <DoctorDrop/>

          <div className='flex flex-col sm:flex-row  w-full   gap-2'>

            <div className=''>
            <span className=''>Reason for Appointment</span>

          <textarea
              name="reason"
              rows={3} 
              placeholder="Enter reason for appointment"
                className="w-full mt-2 px-4 py-2 rounded-[11px] border border-gray-700 text-start resize-none"
               />

            </div>

              <div className=''>
              <span className=''>Additional comments</span>
            <textarea
              name="additionalcomments"
              rows={3} 
              placeholder="Enter if specific problem "
              className="w-full mt-2 px-4 py-2 rounded-[11px] border border-gray-700 text-start resize-none"
               />

            </div>
          

          </div>

            
          {/* <div className='mt-1 '>

        
            <span className=''>Expected AppointMent Date</span>
            <input className='w-full mt-2 py-[10px]  rounded-[11px] border-gray-700 border' type="date" name="schedueledDate" id="" />
             </div>

        <div className='w-full flex justify-center items-center bg-blue-800 rounded-[11px] mt-4'>
            <button type="submit" className='py-2 '>Submit and Continue</button>

        </div> */}

        
         <Test/>          

        </div>
        </form>

      
        </div>
        </div>
  )
}

export default AppointmentPage