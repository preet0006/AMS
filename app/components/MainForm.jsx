'use client'
import React, { useState } from "react";
import { fields } from "@/constant";
import { medical } from "@/constant";
import { docs } from "@/constant";
import DropDown from "./DropDown";
import { verificationData } from "@/constant";
import { useRouter } from "next/navigation";
import PopUp from "./PopUp";


const MainForm = () => {

      const [formData, setFormData] = useState(
        fields?.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
         );
      
     const [medicalData, setMedicalData] = useState(
        medical.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
      );
      
      const [open,setOpen] = useState(false)

      const [selectedPhysician,setIsSelectedPhysician]=useState('');

      const[idFile,setIdFile]=useState(null)
      
      const [verificationType,setVerficationType]= useState();
      const [IdentificationData,setIdentificationData]=useState();

      const [loading,setLoading]=useState(false)

      const [errors,setErrors] = useState(
         fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
      )
      //  console.log(formData)
      // console.log(verificationType)
      // console.log(IdentificationData)

      const router= useRouter()
      
      // console.log(selectedPhysician)

      const handleChange =(e)=>{
        const {name,value}=e.target;

        let newValue = value;

        if(name==="phone" ){
         newValue = value.replace(/\D/g, ""); 
        if (newValue.length > 10) newValue = newValue.slice(0, 10);
        }




        setFormData({...formData,[name]:newValue})

        setErrors({ ...errors, [name]: newValue.trim() === "" ? "This field is required" : "" });

      
      }


      
         
      const handleFormClick =  async(e)=>{
        e.preventDefault()
        // console.log(formData,medicalData,verificationType,verificationData,selectedPhysician);
        setLoading(true)

        
        const emptyFields = fields.find(e=>!formData[e.name]?.trim && !e.optional)

        if(emptyFields){
           setErrors({ ...errors, [emptyFields.name]: "This field is required" });
           setOpen(true)
           setLoading(false)
           return
        }

      const payload = new FormData()
      payload.append("personalInfo",JSON.stringify(formData));
      payload.append("medicalInfo",JSON.stringify(medicalData));
      payload.append("identification",JSON.stringify({identificationType:verificationType,idNumber:IdentificationData}))
      payload.append("primaryPhysician", selectedPhysician);
      
      if(idFile){
        payload.append("file",idFile)
      }

      console.log(formData)
      
      const response = await fetch("/api/users",{
        method:"POST",
        body:payload
      })

      const data = await response.json();

      console.log("server",data)
      
      if(data.success ){
         router.push("/")
         setLoading(false)
      }else{
        setOpen(true)
      }
      }


   
  //  console.log(formData)
   
  //  console.log(medicalData)



  return (
    <div className="w-full text-sm sm:text-base  mt-8   ">
      <h3 className="text-xl sm:text-2xl">Personal Information</h3>
      
      {
        open&&(
          <PopUp setOpen={setOpen}/>
        )
      }
      

      <form onSubmit={handleFormClick}  className="w-full mt-6 space-y-6">

        <div className="flex  flex-wrap gap-4 px-6">

            {fields.map((field, idx) => (
            <label
              key={idx}
              className={`${field.full ? "basis-full  min-w-[296px] " : "flex-1 min-w-[300px] lg:min-w-[470px] px-1 relative "}`}
            >
            {field.optional && (
             <span className="text-sm text-gray-500 ml-1">(optional)</span>
             )}
              <span className="block ">{field.label}</span>

                <div className=" border  flex  border-gray-300  rounded-xl px-3  mt-1 outline-none w-full p-2">
                <h3>{field.icon && <field.icon className=" w-6 h-6 text-gray-300" />}</h3>
              <input
                className="w-full px-2  h-full outline-none"
                value={formData[field.name] || ""}
                type={field.type}
                name={field.name}
                
                placeholder={field.placeholder}
                onChange={handleChange}
              
              />
              
    

                </div>
                  {errors[field.name] && <span className="text-red-500 text-sm">{errors[field.name]}</span>}
                <div >
                </div>
            </label>
          ))}
        </div>


      

     <div className="w-full  h-full mt-10">
       <h3 className=" text-xl sm:text-2xl">Medical Information <span className=" text-sm sm:text-[20px] px-1 text-gray-400"> {`(optional)`}</span></h3>
       <div className="w-full px-6">

     
           <label
              className= "basis-full  flex-1 min-w-[300px] lg:min-w-[470px] px-1  "
            >
              
                <h4 className="">Primary Care Physician</h4>
             
              <div
                className=" w-full  ">
                  <DropDown setIsSelectedPhysician={setIsSelectedPhysician} data={docs}/>

      
              </div>
            </label>
              </div>
            
   <div className="flex flex-wrap  gap-4 px-6">
    {
        medical.map((field,idx)=>(
          <label className="flex-1 min-w-[300px] lg:min-w-[470px] px-2" key={idx}>
            <h6 className="block">{field.label} </h6>
              <input
                className={`border px-6 border-gray-300 mt-1 rounded-xl outline-none w-full p-2 
                ${field.full?"h-18":""}`}
                value={medicalData[field.name]}
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e)=>setMedicalData({...medicalData,[field.name]:e.target.value})}
              />
          </label>
      
        ))
    }
  

   </div>
  
    
    </div>   


      <div className="flex flex-col mt-10  ">

          <h3 className="text-xl sm:text-2xl">Identification and Verification  </h3>
               <div className="relative px-6 mt-4 w-full ">

                <select  value={verificationType || ""}
                onChange={(e) => setVerficationType(e.target.value)} className="border
                  outline-none bg-[#131619] px-6 border-gray-300 mt-1  rounded-xl  w-full p-2" name="" id="">

                  <option value="">Select</option>
                  {verificationData.map((elem, idx) => (
                  <option key={idx} value={elem.name}>
                     {elem.name}
                     </option>
         ))}
                </select>
               </div>
             
          
              <label  className= "flex-1 min-w-[300px] mt-4 lg:min-w-[470px] px-6 "
            >
              <span className="block  ">Identification Number</span>


             {IdentificationData === "" && (
             <span className="text-red-500 text-sm p-3">This field is required</span>
              )}
              <input
                onChange={(e)=>setIdentificationData(e.target.value)}
                className="border px-6 border-gray-300 mt-1 rounded-xl outline-none w-full p-2"
                type="text"
                required
                placeholder="number..."
              />
            </label>
                  
            <label
             
              className= "flex-1 min-w-[300px] mt-4 lg:min-w-[470px] px-6 "
            >
              <span className="block  ">Scanned Copy of Identification Document</span>
              <div className="flex w-full  h-32 ">
               <input
                className="border px-6 border-gray-300 mt-1 rounded-xl outline-none w-full p-2"
                type="file"
                onChange={(e) => setIdFile(e.target.files[0])}
                placeholder="Birth certificate"
              />
             
              </div>
            </label>  
    
       </div>

         <div className="flex flex-col ml-5 mt-8 space-y-1 h-fit text-gray-400">
         <h3 className="text-2xl text-white "> Consent and Privacy</h3>
     
         <div className="flex flex-col pl-4 space-y-1">
     
            <span className="mt-2 "> <input type="checkbox" name="" id="" />
             i consent to recive treatment for my health condition </span>
             <span className=""> <input type="checkbox" name="" id="" /> 
     
             i consent to use and disclosure of my health information for treatment purposes  </span>
             <span className=""> <input type="checkbox" name="" id="" /> 
     
             i acknowledge that i have reviewed and agree to the privacy policy </span>
     
         </div>
 



     </div>

     <button type="submit" className="bg-[#01070B] mt-5 flex items-center justify-center  mb-10 w-full py-3 text-[18px] rounded-xl">
      {
        loading?(
            <div className="w-6 h-6 border-4 border-white  border-t-transparent rounded-full animate-spin"></div>
        ):"Submit and Continue"
      }
      </button>

      </form>


    </div>
  );
};

export default MainForm;
