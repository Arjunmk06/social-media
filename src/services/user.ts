import { Express } from "express-serve-static-core"
import User from "../models/user"
import bcrypt from "bcryptjs"

export class UserService {
    public static async registerRoutes(app: Express) {
        app.get("/users", async (req: any, res: any, next: any) => {
            let users
            try {
                users = await User.find()
                if (!users) {
                    res.status(404)
                    return res.send({
                        error: true,
                        response: "no user found",
                    })
                }
                return res.send({
                    error: false,
                    response: users
                })
            } catch (err) {
                console.log("err", err)
                return res.send({ error: true, response: err })
            }
        })

        app.post("/signup", async (req, res, next) => {
            let userExist
            try {
                const body = req.body
                console.log(body)
                let email = body.email
                userExist = await User.findOne({ email })

                if (userExist) {
                    console.log("user already exist with email id")
                    res.status(400)
                    return res.send({
                        error: true,
                        response: "User alreay exist with the email, Pls Login instead"
                    })
                }
                const hashedPassword = bcrypt.hashSync(body.password)
                let user: any = new User({
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                    blogs:[]
                })
                try {
                    await user.save()
                    console.log("user", user)
                } catch (err) {
                    console.log("error while signup", err)
                    return res.send({
                        error: true,
                        response: err
                    })
                }
                res.status(201)
                return res.send({
                    error: false,
                    response: user
                })
            } catch (err) {
                console.log("err from signup", err)
                return res.send({
                    error: true,
                    reponse: err
                })
            }
        })

        app.post("/login", async (req, res, next) => {
            try {

                const body = req.body

                const email = body.email
                const password = body.password

                let existingUser:any = await User.findOne({email})
                console.log(existingUser)

                if (!existingUser) {
                    console.log("No user found on this email, Please Signup")
                    res.status(404)
                    return res.send({
                        error: true,
                        response: "No user found on this email, Please Signup"
                    })
                }

                let ifPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

                if (!ifPasswordCorrect) {
                    console.log("Incorrect password/email")
                    res.status(401)
                    return res.send({
                        error: true,
                        response: "Incorrect password/email"
                    })
                }

                res.status(200)
                return res.send({
                    error: false,
                    response: "Login sucessfully"
                })

            } catch (err) {
                console.log(err)
                return res.send({
                    error:true,
                    response:err
                })

            }
        })

        app.get("/user/:id", async(req,res,next)=>{
            try{
                let id = req.params.id
                console.log("id", id)
                let existingUser = await User.findById(id)
                if(!existingUser){
                    console.log("No such user for given Id")
                    res.status(404)
                    return res.send({
                        error: true,
                        response: "No such user for given Id"
                    })
                }

                console.log("user", existingUser)
                res.status(200)
                return res.send({
                    error: false,
                    response: existingUser
                })
            }catch(err){
                console.log("error while fetching user", err)
                return res.send({
                    error: true,
                    response: err
                })
            }
        })
    }
}

export default UserService