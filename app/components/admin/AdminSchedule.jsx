'use client'

import React, { useState } from "react";
import AdminPopUp from "./AdminPopUp";
import { ArrowLeft } from "@deemlol/next-icons";
import { ArrowRight } from "@deemlol/next-icons";

const AdminSchedule = ({data}) => {
  
  const[popUp,setPopUp]=useState(false)
  const [type,setType]=useState("");
  const [currentPage,setCurrentPage]=useState(0)
const [popUpData,setPopUpData]=useState({})

  const [tableData,setTableData]=useState(data)
  const rowsPerPage = 5

  const startingIndex =  currentPage * rowsPerPage
  const endingIndex = startingIndex + rowsPerPage
  const visibleRows = tableData.slice(startingIndex,endingIndex);


  const totalPages = Math.ceil(tableData.length/rowsPerPage) 

  

// console.log(popUpData)
  
// const tableData = [
//   {
//     image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/09/doc-brown-s-dark-backstory-hidden-by-back-to-the-future-explained.jpg",
//     date: "2025-09-01",
//     status: "Available",
//     doctors: "Dr. John Smith",
//     actions: "View",
//   },
//   {
//     image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/09/doc-brown-s-dark-backstory-hidden-by-back-to-the-future-explained.jpg",
//     date: "2025-09-02",
//     status: "On Leave",
//     doctors: "Dr. Sarah Johnson",
//     actions: "Edit",
//   },
//   {
//     image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/09/doc-brown-s-dark-backstory-hidden-by-back-to-the-future-explained.jpg",
//     date: "2025-09-03",
//     status: "Available",
//     doctors: "Dr. Michael Brown",
//     actions: "Delete",
//   },
//   {
//     image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/09/doc-brown-s-dark-backstory-hidden-by-back-to-the-future-explained.jpg",
//     date: "2025-09-04",
//     status: "Busy",
//     doctors: "Dr. Emily Taylor",
//     actions: "View",
//   },
//   {
//     image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/09/doc-brown-s-dark-backstory-hidden-by-back-to-the-future-explained.jpg",
//     date: "2025-09-05",
//     status: "Available",
//     doctors: "Dr. David Wilson",
//     actions: "Edit",
//   },
// ];


  return (


    <div className="w-full  h-full  sm:p-4">
      {
         popUp && (
             <AdminPopUp items={popUpData}  setPopUp={setPopUp} 
             type={type}/>
        )
      }
     
          
      <table className="w-full   border-y-0  border border-gray-800  table-fixed text-[14px] text-center">
      
        <thead className="w-full   bg-black">
          <tr className="">
            <th className="py-4 font-light">User</th>
            <th className="py-4 hidden sm:table-cell  font-light">Date</th>
            <th className="py-4 hidden sm:table-cell   font-light">Status</th>
            <th className="py-4 hidden sm:table-cell  font-light">Doctor</th>
            <th className="py-4 font-light">Action</th>
          </tr>
        </thead>

        
        <tbody className=" w-full  ">

              {
                visibleRows.map((row,idx)=>(
                     <tr key={idx} className="">
                  <td className="rounded-full px-6 py-3  w-[30px] h-[30px] ">

                    <div className="text-center flex items-center space-x-4">
                      
                
                    <img className="w-[40px] rounded-full h-[40px] object-cover hidden sm:table-cell" src={row.image}  alt="" />
                    <span>{row.applicant.fullName}</span>
                        </div>

                    
                     </td>
                    
               <td className="py-3 hidden  sm:table-cell px-3">{row.schedueledDate}</td>
                <td className="py-3 hidden  sm:table-cell px-3">{row.status}</td>
                <td className="py-3 hidden  sm:table-cell px-3">{row.doctorName}</td>
                
               <td className="space-x-3">
                <button onClick={()=>{setPopUp(true), setType("approve"), setPopUpData(row)}} className="text-green-400 text-[14px]">Schedule</button>
                <button onClick={()=>{setPopUp(true),setType("cancel")}} className="text-[15px]">Cancel</button>
               </td>
          </tr>

                ))
              }
      
         
       
        </tbody>

         
      
       
      </table>

         <div className="flex mt-2 border-b-2 px-2 border-gray-800 w-full justify-between  bg-[rgba(19,22,25,1)] ">
              <button  onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}><ArrowLeft size={26} color="#FFFFFF" /></button>
              <button  onClick={() => setCurrentPage(currentPage + 1)}><ArrowRight size={26} color="#FFFFFF" /></button>

            </div>
              

    </div>
  );
};

export default AdminSchedule;
