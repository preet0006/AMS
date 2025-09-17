'use client'

import React, { useState } from 'react';
import { Bell } from "@deemlol/next-icons";
import { XCircle } from "@deemlol/next-icons";
import Pusher from "pusher-js";
import { useEffect } from 'react';

const Notification = ({userId}) => {
  const [open, setOpen] = useState(false);
  const [messages,setMessages]= useState([])
  console.log(messages)

  useEffect(() => {
    if (!userId) return;

   
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

 
    const channel = pusher.subscribe(`user-${userId}`);
    
    
    channel.bind("appointmentGranted", (data) => {
      console.log(data)
      setMessages(prev => [
        ...prev,
        `✅ Appointment granted for ${data.fullName} at ${data.scheduledTime || "N/A"}`,
      ]);
    });

    // Cleanup subscription on unmount
    return () => pusher.unsubscribe(`user-${userId}`);
  }, [userId]);







  return (
    <div className="relative w-full   flex-shrink-0">
     
      <span
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Bell size={28} color="#FFFFFF" />
      </span>

   
      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-gray-800 mt-2 min-w-96  h-[60vh]  text-white p-4 rounded z-50">


           <div className='relative text-start py-2  rounded-4xl  w-full'>
         
           <h6 className='font-medium text-xl  '>Appointment Confirmed!</h6>
          
          <div className='absolute top-1 right-0 '>
            <button className=''  onClick={() => setOpen(!open)}>
               <XCircle size={30} color="#FFFFFF" /> 
              
              </button> 
         

          </div>
          
            </div>

            <div className='flex flex-col mt-8 w-full justify-center items-center'>
           <img className='w-40 h-40 rounded-full' src="./dc2.jpg" alt="" />
           <div className='flex text-start max-w-64 text-xs p-2 mt-3'>
            <p>Details and timing will be provided to this gmail or phone Number make sure to check it out </p>

           </div>
    

           <div className='mt-4 cursor-pointer   bg-blue-900 w-full max-w-40'>
            
             <button  onClick={() => setOpen(!open)} className=' cursor-pointer py-2 rounded-xl '>Okay</button>
           </div>
            
             
           </div>


        </div>
      )}
    </div>
  );
};

export default Notification;
