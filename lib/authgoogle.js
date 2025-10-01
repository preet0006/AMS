import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { connectDb } from "./connection";
import GoogleUser from "@/models/GoogleUser";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
      async authorize(credentials) {
        const { email, otp,name } = credentials;
        if (!email || !otp) throw new Error("Invalid request");

        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: "email",
        });

        if (error || !data.user) throw new Error("Invalid OTP");

        await connectDb();

      
        let user = await GoogleUser.findOne({ email });
        if (!user) {
          user = await GoogleUser.create({ email,name:name || "harry" });
        }

    
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || null,
          image: user.image || null,
          phoneNumber: user.phoneNumber || null,
        };
      },
    }),
  ],

  callbacks: {

    async signIn({ user, account }) {
      await connectDb();

      if (account?.provider === "google") {
        let existingUser = await GoogleUser.findOne({ email: user.email });
        if (!existingUser) {
          existingUser = await GoogleUser.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }
        user.id = existingUser._id.toString();
      }

      return true;
    },

   
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          token.id = user.id || user.Id;
          token.email = user.email || null;
          token.name = user.name || null;
          token.image = user.image || null;
        }

        if (account?.provider === "email-otp") {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name || null;
          token.image = user.image || null;
          token.phoneNumber = user.phoneNumber || null;
        }
      }
      return token;
    },

   
    async session({ session, token }) {
      return {
        user: {
          id: token.id,
          email: token.email || null,
          name: token.name || null,
          image: token.image || null,
          phoneNumber: token.phoneNumber || null,
        },
      };
    },
  },
};
