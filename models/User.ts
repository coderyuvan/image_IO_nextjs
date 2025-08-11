import bcrypt from "bcryptjs";
import mongoose,{Schema,model,models} from "mongoose";

// step:-1 doing type safety by declaring data types
export interface iUser{
    email:string;
    password:string 
    _id?:mongoose.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;
}

// step:-2 <> is brackets m user ka type bta dia ki isi type ka data enter hoga else it will show error 
const userSchema=new Schema<iUser>(
    {
     email:{
        type:String,
        required:true,
        unique:true
     },
     
     password:{
        type:String,
        required:true,
     }
    },

    {
     timestamps:true
    }
);


// this part will check if there is change in password before saving in to database using prehook and nexthook
// save is where u want to apply hook nd then function
userSchema.pre("save",async function(next){
     if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
     }  
     next();
});


// in nextjs we dont just directly export model instead we check if it is already created then give else create new one

// check if model exist || create a new user model of iuser type
const User=models?.User || model<iUser>("User",userSchema);

export default User;