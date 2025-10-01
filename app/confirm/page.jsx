import React from 'react'
import TickAnimation from './animation'

const page = () => {
  return (

    
    <div className=' flex   justify-center items-center mt-10 flex-col overflow-hiddenw-full space-y-7 max-w-screen '>

         <div className='flex items-center justify-center gap-3'>
            <img className='w-12 h-12 roun' src="/igf.png" alt="" />
            <h5 className='text-[15px] font-medium'>CarePlus</h5>
         </div>

         <div className='mt-12  max-w-xl  text-center space-y-2  '>
          <TickAnimation/>
            <h3 className='text-3xl mt-6'>Your <span 
            className='text-sky-600'>appointment request </span>
            has been successfully submitted!
            </h3>
            <p className=' text-[13px] text-gray-500'>We'll be in touch shortly to confirm</p>
            
         </div>
         <div className='flex flex-col mt-12 hidden md:block  max-w-2xl space-y-6'>
          <h4 className='text-2xl font-semibold'>Appointment Guidelines</h4>

          <p>Timeliness: Please arrive at least 10 minutes before your scheduled appointment. Late arrivals may result in rescheduling to accommodate other patients.</p>

          <p>Conduct: Maintain a respectful and professional demeanor toward staff and other patients. Disruptive behavior may result in refusal of service.</p>

         </div>

         


         

    </div>
  )
}

export default page