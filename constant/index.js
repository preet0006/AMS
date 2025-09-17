
import { Mail } from "@deemlol/next-icons";
import { Phone } from "@deemlol/next-icons";
import { Calendar } from "@deemlol/next-icons";

export const fields = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter your name", full: true },
  { name: "email", label: "Email", type: "email", placeholder: "Enter your email" ,icon:Mail },
  { name: "phone", label: "Phone Number", type: "text", placeholder: "Enter your phone number",icon:Phone },
  { name: "dob", label: "Date of Birth", type: "text", placeholder: "DD/MM/YYYY" , icon:Calendar },
  { name: "gender", label: "Gender", type: "text", placeholder: "Male / Female / Other" },
  { name: "address", label: "Address", type: "text", placeholder: "Enter your address" },
  { name: "occupation", label: "Occupation", type: "text", placeholder: "Enter your occupation" },
  { name: "emergencyName", label: "Emergency Contact Name", type: "text", placeholder: "Guardian's name",optional:true },
  { name: "emergencyNumber", label: "Emergency Contact Number", type: "text", placeholder: "Guardian's number" ,optional:true},
];


export const medical = [
  {
    name: "insuranceProvider",
    label: "Insurance Provider",
    type: "text",
    placeholder: "ex: BlueCross",
    optional:true
  },
  {
    name: "insurancePolicyNumber",
    label: "Insurance Policy Number",
    type: "text",
    placeholder: "ex: ABC1234567",
    optional:true
  },
  {
    name: "allergies",
    label: "Allergies (if any)",
    type: "text",
    placeholder: "ex: Peanuts, Pollen, Penicillin",
    full: true,
    optional:true
  },
  {
    name: "currentMedications",
    label: "Current Medications",
    type: "text",
    placeholder: "ex: Ibuprofen 200mg, Levothyroxine 50mcg",
    full: true,
    optional:true
  },
  {
    name: "familyMedicalHistory",
    label: "Family Medical History (if relevant)",
    type: "text",
    placeholder: "ex: Mother had breast cancer, Levothyroxine 50mcg",
    full: true,
    optional:true
  },
  {
    name: "pastMedicalHistory",
    label: "Past Medical History",
    type: "text",
    placeholder: "ex: Asthma diagnosis in childhood",
    full: true,
    optional:true
  },
];

   export const docs = [
    {name:'Dan',image:"/dc1.jpg"},
    {name:'Annie wayne',image:"/dc2.jpg"},
     {name:'Big Drip',image:"/dc3.jpg"},     
      {name:'john doe',image:"/dc4.webp"},
     {name:'Mike mclusky',image:"/dc5.jpg"},    
       {name:'Rahul raikoti',image:"/dc6.webp"},

]




export const verificationData = [
  { name: 'Aadhaar Card' },
  { name: 'Voter ID' },
  { name: 'Passport' },
  { name: 'Driving License' },
  { name: 'PAN Card' },
  { name: 'Student ID' },
];
