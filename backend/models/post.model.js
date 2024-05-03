import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content : {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        imgae: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntTvfxUxxBbl0tM_utrWS2X6XiqU2_mJLLukFqsfbTw&s",
        },
        category: {
            type: String,
            default: 'uncategorized'
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

    }, {timestamps: true}
);

const Post = mongoose.model('Post', PostSchema);

export default Post;