
import React, { useState } from 'react'

const AdminPopUp = ({setPopUp,setCancel,type,items }) => {
    

    console.log(items)

    const [message,setMessage]=useState('')
    const [time,setTime]=useState('');
    const [period, setPeriod] = useState("AM");
    
    console.log(message)
    
    const handleClick = async({type})=>{

    if (type === "granted") {
    if (!time) {
      alert("Please select a time.");
      return; 
    }

    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour) || isNaN(minute)) {
      alert("Invalid time.");
      return; 
    }

    
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const totalMinutes = hour * 60 + minute;
    const minAllowed = 10 * 60; 
    const maxAllowed = 17 * 60; 

    if (totalMinutes < minAllowed || totalMinutes > maxAllowed) {
      alert("Appointments can only be scheduled between 10 AM and 5 PM.");
      return; 
    }
  }
        
        console.log(type)

        
        const {applicant,_id}=items
        console.log(applicant, _id)
        try 
        {
 

            const body= {
                 userId:applicant,
                 type,
                 appointmentId:_id,
            }

            if(type=="granted" && time){
                 body.time = `${time} ${period}`;
            } else if (type === "cancelled" && message) {
                body.cancelMessage = message;
              }


          

            const response = await fetch("/api/appointment",{
                method:"PATCH",
                headers: { "Content-Type": "application/json" },

                body:JSON.stringify(body)
            });

           const data = await response.json(); 
              console.log("Server response:", data);
              if(data.success){
                setPopUp(false)
              }
          
        } catch (error) {
            console.log(error)
            
        }

    }


  return (
    <div className=' fixed  bg-black/50 backdrop-blur-xs   inset-0 flex justify-center items-center '>

        <div className=' relative flex flex-col border-gray-700 w-full max-w-96 text-xs sm:text-[16px] sm:max-w-[450px] bg-gray-900 p-4'>

          {  type==="approve"?(
             <div className='flex  py-3 px-6 flex-col w-full'>
           <div className='flex  justify-between px-5 '>
            <div className='flex gap-2 flex-col '>
                <h5 className='text-xl'>Schedule Appointments</h5>
                <p className='text-xs'>Please check the following Details</p>
                
            </div>
            <button onClick={()=>setPopUp(false)} className='pb-2'>X</button>


            </div>

            <div className='flex flex-col px-5 gap-3 pt-4'>
                <h6>Doctor</h6>
                <div className='flex py-2 outline-none border-gray-700 rounded-xl border '>
                    {/* <img src="" alt="img" /> */}
                    <input className='  w-full px-3 outline-none' placeholder='doctor name comes here' type="text" name="" readOnly value={items?.doctorName} id="" />
                    

                </div>
                <div className='flex flex-col gap-2 mt-1'>
                     <h6>Reason for Appointment</h6>
                     <input className='border outline-none border-gray-700  px-3 py-7 rounded-xl' type="text" name="" readOnly value={items.reason} id="" placeholder='ex Annual Monthly Checkup' />

                     <div className='flex flex-col gap-2 mt-1 '>
                         <h6>Expected Appointment Time</h6>
                         <div className='border space-x-2 outline-none border-gray-700  px-3 py-7 rounded-xl'>
                          <input  min="10:00" max="5:00" value={time}  onChange={(e) => setTime(e.target.value)}  className='' type="time" name="" id="" placeholder='ex Annual Monthly Checkup' />
                         <select className='bg-gray-900' value={period} onChange={(e) => setPeriod(e.target.value)}>
                         <option value="AM">AM</option>
                         <option value="PM">PM</option>
                         </select>

                         </div>
              

                     </div>

                </div>
               

            </div>
        
              <div className='flex w-full mb-3 pt-4 justify-center px-6  items-center'>
            

              <button onClick={()=>handleClick({type:"granted"})} className="bg-blue-800 mt-5 mb-3 w  py-3   rounded-xl w-full ">Schedule Appointment</button>
    
             
             </div>


            </div> 
           

           ):(
                   <div className='flex gap-3 p-6 w-full flex-col'>
                <div className='flex justify-between '>
                    <h3 className='text-xl font-bold'>Cancel Appointment</h3>
                    <button onClick={()=>setPopUp(false)}>X</button>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='text-[14px]'>Are you sure you want to cancel the appointment</p>
                    <div className='flex flex-col space-y-3'>

                        <h4 className='text-[14px]'>Reason for cancellation</h4>
                        <input onChange={(e)=>setMessage(e.target.value)} className=' outline-none w-full border-gray-600 rounded-x text-start   py-7 border' type="text" name="" id="" />

                    </div>
                    <div className='flex justify-center items-center w-full pt-3'>
                        <button onClick={()=>handleClick({type:"cancelled"})} className='bg-[rgba(242,78,67,1)]  w-full py-2 rounded-xs'>Cancel appointment</button>

                    </div>


                </div>

            </div>

           )
 }
    

        

       

        </div>

     


    </div>
  )
}

export default AdminPopUp