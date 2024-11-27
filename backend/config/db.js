import mongoose from "mongoose";

export const connectDB =async ()=>{
    (
      await mongoose.connect(
        "mongodb+srv://nobertsam:Samsan2000@cluster0.rqexcaj.mongodb.net/food-del?retryWrites=true&w=majority"


      )
    ).isObjectIdOrHexString(() => console.log("DB Connected"));
}