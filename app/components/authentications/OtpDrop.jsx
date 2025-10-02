import React from 'react'
import { AlertCircle } from "@deemlol/next-icons";

const OtpDrop = ({setOtpErr}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-50">
      <div className="flex flex-col justify-center items-center h-[30vh] w-full max-w-md rounded-2xl shadow-2xl bg-gray-900 space-y-6 p-6 animate-fadeIn">
        
        <AlertCircle size={52} color="#F87171" className="mb-2" />
        
        <h5 className="text-white text-lg font-semibold text-center leading-snug">
         The otp you entered may not be correct try again or wait for some time and resend the code 
        </h5>

        <button
          onClick={() => setOtpErr(false)}
          className="font-medium px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 transition duration-200 text-white shadow-md"
        >
          Okay
        </button>
      </div>
    </div>
  );
};


export default OtpDrop