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
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})


export default mongoose.model("Post", postSchema)