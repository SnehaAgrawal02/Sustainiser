const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PolicySchema = new mongoose.Schema(
    {
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        },
        link: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        advantages: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            required: true,
        },
        comments: {
            type: [CommentSchema],
            default: []
        }
    },
    { timestamps: true }
);

const PolicyModel = mongoose.model("Policy", PolicySchema);

module.exports = PolicyModel;