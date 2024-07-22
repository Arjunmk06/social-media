import express, { application } from 'express'
import { Configurations } from './config'
import MongooseService from './src/connections/mongoose'
import UserService from './src/services/user'
import { PostServices } from "./src/services/post"


export class App {
    public express

    constructor() {
        this.express = express()
        this.express.use(express.json())
        console.log(Configurations.config)

        MongooseService.createConnection()


        this.setupRoutes()
    }

    public async setupRoutes() {

        UserService.registerRoutes(this.express)
        PostServices.registerRoutes(this.express)

    }



}



export const app = new App().express
const port = 5000
app.listen(port, () => {
    console.log("server run at 5000")
})