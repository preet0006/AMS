'use client'

import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Test = () => {


  const [loading,setLoading]=useState()

  const [date,setDate]=useState()

  const [error,setError]=useState()


    useEffect(() => {
    let timer
    if (loading) {
     
      timer = setTimeout(() => {
        setError("Request is taking too long. Please try again.")
        setLoading(false) 
      }, 15000) 
    } else {
      setError("")
    }

    return () => clearTimeout(timer) 
  }, [loading])


  return (
    <div className='flex flex-col'>

          <div className='flex flex-col'>

        
            <span className='mb-2'>Expected AppointMent Date</span>



         
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
               placeholderText="Select a date"
               className="w-full cursor-pointer py-2 px-4 rounded-lg border border-gray-700 text-white"

                calendarClassName="!bg-gray-900 !text-white !border !border-gray-700 !rounded-xl !shadow-lg"

               dayClassName={(d) =>
               "!text-white hover:!bg-blue-700 hover:!text-white !rounded-md"
                }

                popperClassName="!z-50"
                 dateFormat="dd/MM/yyyy"
                   />
                 </div>

            {date && (
            <input
            type="hidden"
            name="schedueledDate"
            value={date} 
          />
        )}


            

             <div onClick={()=>setLoading(true)} className='w-full flex justify-center items-center bg-blue-800 rounded-[11px] mt-4'>
            <button onClick={()=>setLoading(true)} type="submit" className='py-2  cursor-pointer'>
              {
                loading?(
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ):" Submit and Continue"
              }

             </button>

          {error && <p className="mt-2 text-red-500">{error}</p>}

        </div>


    </div>
  )
}

export default Test