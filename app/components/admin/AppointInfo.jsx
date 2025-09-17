'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { Calendar } from "@deemlol/next-icons";
import { Zap } from "@deemlol/next-icons";
import { ZapOff } from "@deemlol/next-icons";

const AdminPopUp = dynamic(() => import("./AdminPopUp"), {
  loading: () => <p>Loading popup...</p>,
  ssr: false,
});


const AppointInfo = ({data}) => {

console.log(data)

const [stats,setStats]=useState(data)

  const [popUp,setPopUp]=useState(false)
  const [cancel,setCancel]=useState(false)

  return (
    <div className='flex text-sm sm:text-base  flex-col w-full'>
      {
        popUp &&(
           <div className='  flex w-full'>
          <AdminPopUp setPopUp={setPopUp} setCancel={setCancel}/>
          </div>

        )
      }
      

        <div className='flex w-full flex-col mt-8 '>
            <h3 className=' text-2xl sm:text-3xl font-medium  '>Welcome Admin</h3>
            <p className=' text-[10px] max-w-52 sm:max-w-full text-gray-300 sm:text-[14px] pt-1'>Start day with managing you new appointments</p>
        </div>
        
        <div className='flex  justify-center items-center  flex-wrap sm:flex-nowrap sm:flex-row mt-6 space-x-6 space-y-4 sm:gap-10 w-full '>
          
          <div className='flex flex-col rounded-2xl  px-6 py-4 sm:py-10 mt-4 w-[40%] sm:w-1/3 bg-gray-800  '>
            <div className='flex  gap-2 text-center '>
           <span> <Calendar size={36} color="#FFFF00" /></span>
           <h6 className='py-1'>{stats?.pending}</h6>
            </div>
          <p className=' text-xs hidden sm:block sm:text-base mt-5'>Total number of scheduled appointments</p>
            <p className=' text-xs sm:hidden  mt-5'> Scheduled Appointments</p>
        </div>

           <div className='flex flex-col rounded-2xl  px-6 py-4 sm:py-10 mt-4 w-[40%]  sm:w-1/3 bg-gray-800  '>
            <div className='flex gap-2 b '>
           <span className=''><Zap size={36} color="#87CEEB" /></span>
           <h6 className='py-1'>{stats?.approved}</h6>
            </div>
          <p className=' text-xs hidden  sm:block sm:text-base mt-5'>Total number of scheduled appointments</p>

           <p className=' text-xs sm:hidden  mt-5'> Scheduled Appointments</p>
        </div>


              <div className='flex flex-col rounded-2xl  px-6  py-4 sm:py-10 mt-4 w-[40%] sm:w-1/3  bg-gray-800  '>
            <div className='flex gap-2 '>
          <span><ZapOff size={36} color="#FF0000" /></span>
           <h6 className='py-1'>{stats.cancelled}</h6>
            </div>
          <p className=' text-xs hidden sm:block sm:text-base mt-5'>Total number of scheduled appointments</p>
           <p className=' text-xs sm:hidden  mt-5'> Scheduled Appointments</p>
        </div>

        </div>
     
        

    </div>
  )
}

export default AppointInfo