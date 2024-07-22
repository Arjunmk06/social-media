import mongoose from "mongoose";


const Schema = mongoose.Schema

const postSchema = new Schema({
    caption: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})


export default mongoose.model("Post", postSchema)