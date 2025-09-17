import GoogleProvider from "next-auth/providers/google";
import { connectDb } from "./connection";
import GoogleUser from "@/models/GoogleUser";
import CredentialProvider from "next-auth/providers/credentials";


import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialProvider({

      id: "email-otp",
      name: "Email OTP",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" }, 
      },

      async authorize(credentials){
     
        const {email,otp}=credentials;
         if (!email || !otp) throw new Error("Invalid request");

         const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: "email",
            });

          if (error) throw new Error("Invalid OTP");

         let user = await GoogleUser.findOne({email})
      
         if(!user){
          user = await GoogleUser.create({email})
         }

           return {
            id: user._id.toString(),
            email:user.email
       };
      }
    })
  ],

  callbacks: {
    
    async signIn({ user,account }) {
 
      await connectDb();

      if(account?.provider ==="google"){
         let existingUser = await GoogleUser.findOne({ email: user.email });

          if (!existingUser) {
          existingUser= await GoogleUser.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
         user.Id= existingUser._id.toString();
      }
      return true;

    
   

    },


    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          token.id = user.Id || user.id;
          token.email = user.email || null;
          token.name = user.name || null;
          token.image = user.image || null;
        }

       
        if (account?.provider === "email-otp") {
          token.id = user.id;
          token.phoneNumber = user.phoneNumber;
        }
      }

      return token;
    },

    async session({ session,token }) {
      return {
        user: {
        id: token.id,
        phoneNumber: token.phoneNumber || null,
        name: token.name || session?.user?.name || null,
        email: token.email || session?.user?.email || null,
       image: token.image || session?.user?.image || null,
        },
      };
      },
     },
    };
