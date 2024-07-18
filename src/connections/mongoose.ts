import mongoose from "mongoose";
import { Configurations } from "../../config"


export class MongooseService{
    public static async createConnection(){
        try{
            let connectString  = Configurations.config.mongoose as unknown as string | ""
            console.log("connect str", connectString)
            mongoose.connect(connectString)
        .then(()=>{
            console.log("connected database")
        })

        }catch(err){
            console.log("connection error",err)
        }
    }
}

export default MongooseService