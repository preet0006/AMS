import { getServerSession } from 'next-auth'
import React from 'react'

const AdminNav = () => {
  

  return (
  
    <nav className='flex bg-black  px-6 py-3 rounded-xl justify-between   '>
        <div className='flex items-center text-center gap-2.5 '>
              <img className='rounded-full h-6 w-6 sm:h-12 sm:w-12  ' src="https://tse3.mm.bing.net/th/id/OIP.Cz0A-oUwd_7wjw6CVCUQcgHaHa?pid=Api&P=0&h=180" alt="" />

             <h4 className=' text-[16px] sm:text-xl'>Appointmenter</h4>
             
        </div>

        <div>
              <div className='flex items-center text-center justify-center py-1  gap-2.5 '>
              <img className='rounded-full h-6 w-6 sm:w-10 sm:h-10' src="https://tse3.mm.bing.net/th/id/OIP.Euvv_xvBss3sUzphQSQN-AHaI1?pid=Api&P=0&h=180" alt="" />
             <h4 className='text-xs sm:text-[18x]'>Preet</h4>
             
        </div>

        </div>
       
      
       

    </nav>
  )
}

export default AdminNav