import React from 'react'
import MainForm from '@/app/components/MainForm'


const page = () => {
  return (
    <div className='min-h-screen px-4 sm:px-16 '>

      <div className='flex flex-col mt-10 space-y-3'>
       <h1 className='text-2xl sm:text-5xl font-medium'>Welcome </h1>
      <p className='sm:text-[14px] text-xs'>Before continuing plese give us more details about yourself</p>
      </div>

      <div className='flex  w-full '>
        <div className=' w-full sm:w-[85%] '>
          <MainForm/>
        </div>
        <div className='hidden lg:block  absolute top-0 brightness-50 -right-0 flex w-[15%] bg-repeat-y h-full min-h-[120dvw] rounded-b-lg'>
          <img className='w-full h-full rounded-b-lg ' src='/fff.jpg' alt="" />

        </div>
        
      </div>
    

       
    </div>
  )
}

export default page