import mongoose from "mongoose";

const MONGO_URI=process.env.MONGO_URI!

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

let cached=global.mongoose

if (!cached) {
  cached=global.mongoose={ conn: null, promise: null }
   
}

export async function dbConnect() {

  // check if connection already exist
  if(cached.conn)
      return cached.conn;

  // check for promise exist or not
  if(!cached.promise){
    mongoose
    .connect(MONGO_URI)
    .then(()=> mongoose.Connection)
  }
  try {
    cached.conn=await cached.promise
  } catch (error) {
    cached.promise = null;
    throw new Error("Failed to connect to MongoDB: " + error);
    
  }

  return cached.conn
}

