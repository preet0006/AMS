
import Navbar from "../components/Navbar";




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        
        <div className=" flex max-w-[1800px] m-auto h-screen ">
            
            <div className="w-full m-auto h-dvh">
            
              {children}
            </div>
            <div className="  h-screen hidden sm:block w-full  sm:w-1/2">
              <img className=" object-cover w-full h-full" src="./doc1.webp" alt="" />
              

            </div>
            
                 

              
        </div>
       
      
     
       
      </body>
    </html>
  );
}
