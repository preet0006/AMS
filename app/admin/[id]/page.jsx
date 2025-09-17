import AdminSchedule from '@/app/components/admin/AdminSchedule'
import AppointInfo from '@/app/components/admin/AppointInfo'
import React from 'react'
import { sendAdminData } from '@/controllers/adminController'

const Page = async({params}) => {

  const result = await sendAdminData()
  console.log(result)

   
let { findAppointMents, stats } = result.data

findAppointMents = JSON.parse(JSON.stringify(findAppointMents))
stats = JSON.parse(JSON.stringify(stats))



  if(!result){
    console.log("loading set true as data cant fetched")
  }

  
   


  return (
    <div className='flex flex-col overflow-auto w-full px-4
     sm:px-10 '>
      <AppointInfo data={stats}/>
      <div className='flex mt-10 w-full mb-4'>
        <AdminSchedule data={findAppointMents}/>

      </div>
     
    </div>
  )
}

export default Page