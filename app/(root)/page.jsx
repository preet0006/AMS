import React from 'react'
import AppointmentPage from '../components/AppointmentPage'

const page = () => {
  return (
    <div className=' flex  w-full   o  max-w-screen'>

      <div className= ' overflow-y-hidden w-full sm:w-[80%] '>
        <AppointmentPage/>
        
      </div>

 
        <div className='flex hidden sm:block overflow-hidden absolute right-0 top-0 h-screen w-[20%]'>
        <img className=' rotate-180 w-full h-full object-cover' src="https://static.vecteezy.com/system/resources/previews/020/411/855/original/healthcare-medical-science-healthcare-icon-digital-technology-world-concept-modern-business-innovation-treatment-medicine-abstract-about-hi-tech-future-blue-background-and-medical-research-vector.jpg" alt="" />

      </div> 
    </div>
  )
}

export default page



   