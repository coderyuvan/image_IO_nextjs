  # DATA MODELS

# User model will contain 
  * email,password,id ,updatedat createdat

 # Video model will contain
*  title ,description,videoUrL,Thumbnail,controls
 transformation-> restirction on height,width,quality of upload


  # Session
  * coded the data models part installed mongoose bcryptjs

  # connection with data base
   * three cases are there
   connected
   not connected
   promise request on the way ->> special case of nextjs

   * Basically, Next.js me har API request ke liye database connection check karna padta hai — agar already connected hai to fine, warna naya connection banana padta hai. Lekin MERN stack me ek baar database connect ho gaya to wo saare API requests ke liye reuse hota hai, alag se har request me check karne ki zarurat nahi hoti.

   * Because Next.js API routes (or server actions) often run in a serverless environment (like Vercel, Netlify, etc.), each API request may run in a new server instance.

    This means you can’t assume a persistent database connection across requests.

    You need to check if a connection already exists and only create a new one if needed, otherwise you risk creating too many connections.

  # type.d.ts bnaya h for global ki node k ecosystem m db connection exist krta h

  # NEXT-AUTH SETUP
  * sbse phle typsecript ka kaam kra from docs
  * second next-auth regsitration of user handle nhi krta h so we have to write seprate backend api for that
    app/api/auth/register/route.ts
    