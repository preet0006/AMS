import mongoose from "mongoose"


let isConnected = false;

export const connectDb = async()=>{
    if(isConnected){
        console.log("already connection is established ")
        return
    }
    try {
           const db = await mongoose.connect(process.env.MONGO_URI);
           isConnected = db.connections[0].readyState === 1;
           console.log("mongodb connection is good and running")
        
    } catch (error) {
        console.log("failed to establish a connection")
          throw new Error("Failed to connect to MongoDB");
}

}