import Post from "../models/post"
import { v4 as uuidv4 } from "uuid"
import { Express } from "express-serve-static-core"


export class PostServices {
    public static async registerRoutes(app: Express) {
        app.get("/posts", async (req, res, next) => {
            try {

                let posts = await Post.find()

                if (!posts) {
                    console.log("No posts found at all")
                    res.status(404)
                    return res.send({
                        error: true,
                        response: "No posts found at all"
                    })
                }

                res.status(200)
                return res.send({
                    error: false,
                    response: posts
                })
            } catch (err) {
                console.log("error from get all post", err)
                return res.send({
                    error: true,
                    response: err
                })
            }
        })

        app.post("/post", async (req, res, next) => {
            try {
                const body: any = req.body

                let postData = new Post({
                    caption: body?.caption || " ",
                    image: body.image,
                    postId: uuidv4(),
                    user: body.user
                })

                await postData.save()

                console.log("post", postData)

                res.status(201)
                return res.send({
                    error: false,
                    response: postData
                })

            } catch (err) {
                console.log("error while creating post", err)
                return res.send({
                    error: true,
                    response: err
                })
            }
        })

        app.get("/post/:id", async (req, res, next) => {
            try {
                const postId: any = req.params.id
                console.log("id", postId)
                let isPostExist = await Post.findOne({ postId })
                console.log('post', isPostExist)

                if (!isPostExist) {
                    console.log("No such post on this id")
                    res.status(404)
                    return res.send({
                        error: true,
                        response: "No such post on this id"
                    })
                }

                res.status(200)
                return res.send({
                    error: false,
                    response: isPostExist
                })
            } catch (err) {
                console.log("console log while fetching post", err)
                return res.send({
                    error: true,
                    response: err
                })
            }
        })

        app.put("/post/:id", async (req, res, next) => {
            try {
                const postId = req.params.id
                const caption = req.body?.caption || " "

                let isPostExist = await Post.findOne({ postId })
                console.log("post", isPostExist)

                if (!isPostExist) {
                    console.log("No such post exist on this id")
                    res.status(404)
                    return res.send({
                        error: true,
                        response: "No such post exist on this id"
                    })
                }

                await Post.findOneAndUpdate({ postId }, {
                    caption
                })

                const updatePost: any = await Post.findOne({ postId })

                res.status(200)
                return res.send({
                    error: false,
                    response: updatePost
                })
            } catch (err) {
                console.log("error while updating post", err)
                return res.send({
                    error: true,
                    response: err
                })
            }
        })

        app.delete("/post/:id", async (req, res, next) => {
            try {
                const postId = req.params.id

                let isPostExist = await Post.findOne({ postId })
                console.log("post", isPostExist)

                if (!isPostExist) {
                    console.log("No such post exist on this id")
                    res.status(404)
                    return res.send({
                        error: true,
                        response: "No such post exist on this id"
                    })
                }

                const updatePost = await Post.findOneAndDelete({ postId })

                res.status(200)
                return res.send({
                    error: false,
                    response: "Post Deleted succefully"
                })
            } catch (err) {
                console.log("error while deleting post", err)
                return res.send({
                    error: true,
                    response: err
                })
            }
        })
    }
}