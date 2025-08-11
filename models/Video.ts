import mongoose,{Schema,Model,models, model} from "mongoose";
import { scheduler } from "timers/promises";

// defining ki isi type ki video platform p aaskti h basically for transformation section restriction
export const VIDEO_DIMENSIONS={
    width:1080,
    height:1920
} as const;

export interface Ivideo{
    _id?:mongoose.Types.ObjectId;
    title:string;
    description:string;
    videoUrl:string;
    thumbnailUrl:string;
    controls?:boolean;
    transformations:{
        height:number;
        width:number;
        quality?:number;
    };

}


const videoSchema=new Schema<Ivideo>(
    {
     
      title:{
         type:String,
         required:true,
      },
      
      description:{
         type:String,
         required:true,
      },

      videoUrl:{
         type:String,
         required:true,
      },

      thumbnailUrl:{
         type:String,
         required:true,
      },
      
      controls:{
        type:Boolean,
        default:true
      },

      transformations:{
            height:{
                type:Number,
                default:VIDEO_DIMENSIONS.height
            },
            width:{
                 type:Number,
                 default:VIDEO_DIMENSIONS.width
            },
            quality:{
                type:Number,
                min:1,
                max:100
            }
      },

    },
    {
        timestamps:true
    }
);

const Video=models?.Video || model<Ivideo>("Video",videoSchema)

export default  Video