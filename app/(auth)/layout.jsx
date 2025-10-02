import Image from "next/image";
import Providers from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
      

       
        
        <div className=" flex max-w-[1800px] m-auto h-screen ">
            
            <div className="w-full z-50 m-auto h-dvh">
             <Providers>

          
              {children}
                 </Providers>
            </div>
            <div className=" z-10 h-screen hidden sm:block w-full  sm:w-1/2">
              <Image className=" object-cover brightness-90 w-full h-full" src="/dmr.jpg"  alt="" />
              

            </div>
            
                 
              
        </div>

 
      
     
       
      </body>
    </html>
  );
}
