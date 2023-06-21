const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  posts: {
    type: [
      {
        _id: {
          type: Number,
          required: true,
        },
        text: [String],
        hashtags: [String],
        postImgs: [String],
        time: {
          year: Number,
          month: Number,
          date: Number,
          hours: Number,
          minutes: Number,
          seconds: Number,
        },
        action: {
          like: Number,
          celebrate: Number,
          support: Number,
          love: Number,
          insightful: Number,
          curious: Number,
          share: Number,
        },
        totalActions: Number,
        totalComments: Number,
      },
    ],
    default: [],
  },
  comments: {
    type: Object,
    default: [],
  },
  actions: {
    type: Object,
    default: [],
  },
  feed: {
    type: [
      {
        _id: String,
        post: Number,
      },
    ],
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
