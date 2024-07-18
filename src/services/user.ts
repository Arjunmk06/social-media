import { Express } from "express-serve-static-core"
import User from "../models/user"
import bcrypt from "bcryptjs"

export class UserService {
    public static async registerRoutes(app: Express){
        app.get("/users",async(req: any,res: any,next: any)=>{
            let users
            try{
                users = await User.find()
                if(!users){
                    res.status(404)
                    return res.send({
                        error:true,
                        response:"no user found",
                    })
                }
                return res.send({
                    error: false,
                    response: users
                })
            }catch(err){
                console.log("err", err)
                return res.send({error:true, response:err})
        }
        })

        app.post("/signup", async(req,res,next)=>{
            let userExist
            try{
                const body = req.body
                console.log(body)
                let email = body.email
                userExist = await User.findOne({ email })

                if(userExist){
                    console.log("user already exist with email id")
                    res.status(400)
                    return  res.send({
                        error: true,
                        response: "User alreay exist with the email, Pls Login instead"
                    })
                }
                const hashedPassword = bcrypt.hashSync(body.password)
                let user: any = new User({
                    name: body.name,
                    email: body.email,
                    password: hashedPassword
                })
                try{
                    await user.save()
                    console.log("user", user)
                }catch(err){
                    console.log("error while signup", err)
                    return res.send({
                        error: true,
                        response: err
                    })
                }
                res.status(201)
                return res.send({
                    error:false,
                    response: user
                })
            }catch(err){
                console.log("err from signup", err)
                return res.send({
                    error: true, 
                    reponse: err
                })
            }
        })
    }
}

export default UserService