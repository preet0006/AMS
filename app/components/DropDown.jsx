'use client'

import React, { useEffect, useRef, useState } from 'react'



const DropDown = ({data,setIsSelectedPhysician}) => {
  


  const [isOpen,setIsOpen,]=useState(false)
  const [selectedData,setSelectedData]=useState({})
   console.log(selectedData)

  const drop = useRef();

  useEffect(() => {
    const handleOutsideClick = (e)=>{
      if(drop.current && !drop.current.contains(e.target)){
        setIsOpen(false)
      }

    }
   document.addEventListener("mousedown", handleOutsideClick);

     return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
  
  }, [])
  


  return (
    <div   ref={drop} className='flex mt-1 flex-col'>

      <div  onClick={()=>setIsOpen(!isOpen)}  className=' border border-gray-300 rounded-xl outline-none  relative flex py-1 gap-2 w-full text-center  items-center pl-3'>
       <img className='sm:w-9 sm:h-9 h-6 w-6  object-cover rounded-full object-top' src={selectedData?.image || 'https://c8.alamy.com/comp/KHY945/doctor-cartoon-character-KHY945.jpg'} alt="" />
         <span className='text-center'>{selectedData?.name || 'Choose your Physician'}</span>
         
         <div className='absolute right-4'>
       <span  className="text-gray-400">▼</span>

         </div>



      </div>

      

                 
                  <div className={`flex flex-col bg-[rgba(19,22,25,1)] gap-2 rounded-md mt-1 
                  overflow-hidden transition-all duration-300 ease-in-out
              ${isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
        `}
      >
                    {
                      data?.map((elem,idx)=>(
                          <div key={idx} 
                          onClick={()=>{setIsSelectedPhysician({ name: elem.name}),setIsOpen(false) ,setSelectedData(elem)}} className='flex pl-2 gap-2 text-center items-center hover:bg-blue-700'>
                         <img className='w-9  h-9 rounded-full object-cover object-top ' src={elem.image} alt="" />
                        <span>{elem.name}</span>

                    </div>
                      ))
                    }

       
        
         


          

      </div>
          

    

     

   


     

      </div>
  )
}

export default DropDown