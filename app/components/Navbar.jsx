
import { Bell } from "@deemlol/next-icons";
import Notification from './Notification';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authgoogle";

const Navbar = async () => {

    const session = await getServerSession(authOptions);

    // console.log(session.user.id)

    const userId = session.user.id
  
  
    
  return (

    <div className='flex  text-center items-center  max-w-6xl justify-between'>

   


    <div className='flex  max-w-xs  sm:max-w-xl   gap-3 text-xl  sm:text-2xl text-center  px-6 sm:px-16 '>
     
        <img className='rounded-full h-7 w-7 sm:w-10  sm:h-10  ' src="https://tse3.mm.bing.net/th/id/OIP.Cz0A-oUwd_7wjw6CVCUQcgHaHa?pid=Api&P=0&h=180" alt="" />
       <h2 className='font-medium'> Appointmenter</h2>
    </div>

    <div className='flex flex-none px-10 sm:px-3  '>
     
     

    
      <Notification userId={userId} />
     

    </div>

     </div>
  )
}

export default Navbar