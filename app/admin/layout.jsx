

import { Geist, Geist_Mono } from "next/font/google";

import AdminNav from "../components/admin/AdminNav";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[rgba(19,22,25,1)] min-h-screen overflow-y-auto`}
      >
        <div className=" mt-3 w-full  max-w-[1800px] m-auto py-4 px-5  text-white ">
             <AdminNav/>
              {children}
        </div>
     
       
      </body>
    </html>
  );
}
