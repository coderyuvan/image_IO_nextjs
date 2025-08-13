import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions:AuthOptions = {
    providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    
    CredentialsProvider({
        name:"Credentials",
        credentials:{
            email:{label:"email",type:"text"},
            password:{label:"Password",type:"password"}
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
                throw new Error("Please enter email and password");
            }
            try {
                await dbConnect()
                const user=await User.findOne({
                    email:credentials.email})
                if(!user){
                    throw new Error("No user found with this email");
                }

                const isValid=await bcrypt.compare(credentials.password,user.password);
                if(!isValid){
                    throw new Error("Invalid credentials");
                }
                  return {
                    id:user._id.toString(),
                    email:user.email,
                  }

            } catch (error) {
                console.error("auth error:", error);
                throw new Error("Error while logging in");
            }
        },
    })

  ],

  callbacks: {
    async jwt({token,user}){
        if(user){
            token.id=user.id;
        }
        return token;
    },

    async session({session,token}){
        if(session.user){
            session.user.id=token.id as string
        }
        return session
    }

  },

  pages:{
    signIn:"/login",
    error:"/login",
  },
  
  session:{
    strategy:"jwt",
    maxAge:30 * 24 * 60 * 60,
  },

  secret:process.env.NEXTAUTH_SECRET

};