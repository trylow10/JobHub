const express = require("express");
const User = require("../schema/users");
const signature = require("../crypto/functions").signature;
const { validateToken } = require("../helper/token");
const uuid = require("uuid").v4;
const ImageKit = require("imagekit");
const Session = require("../schema/session");
const Post = require("../schema/post");
const { sha512 } = require("js-sha512");
require("dotenv").config();

const Router = express.Router();

Router.use("/update", require("./others/userUpdate"));
Router.use("/forgot-pass", require("./others/userPass"));
// Router.use("/hashtag", require("./others/hashtag"));

var imagekit = new ImageKit({
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMGKIT_ENDPOINT,
});

const contains = (value, key) => {
  for (let val of value) {
    if (val === key) return true;
  }

  return false;
};

const notContains = (value, key) => {
  for (let val of value) {
    if (val === key) return false;
  }

  return true;
};

Router.get("/", validateToken, async (req, res) => {
  const id = req.body.activeSessionId;
  const responce = {};

  const reqUser = await User.findOne({ _id: id });

  const values = Object.keys(reqUser["_doc"]).filter((key) =>
    notContains(["pass", "salt", "__v"], key)
  );

  const resFields = {};
  values.forEach((val) => {
    resFields[val] = reqUser[val];
  });

  responce["success"] = true;
  responce["user"] = resFields;
  return res.json({ ...responce, signature: signature(responce) });
});

Router.get("/all", validateToken, async (req, res) => {
  const actualUser = req.body.activeSessionId;
  const allUsers = await User.find();
  const responce = {};
  responce["success"] = true;
  responce["users"] = [];
  for (let i of allUsers) {
    if (i._id.toString() !== actualUser) {
      responce["users"].push(i._id.toString());
    }
  }
  res.json({ ...responce, signature: signature(responce) });
});

Router.get("/basic", validateToken, async (req, res) => {
  const reqUserId = req.query.userId || req.body.activeSessionId;
  const responce = {};
  const reqUser = await User.findOne({ _id: reqUserId });

  if (!reqUser) {
    responce["success"] = false;
    responce["error"] = { msg: "Invalid user id", code: 10 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const values = Object.keys(reqUser["_doc"]).filter((key) => {
    return contains(
      [
        "uname",
        "bgImg",
        "profileImg",
        "headline",
        "followers",
        "following",
        "networks",
        "skills"
      ],
      key
    );
  });

  const resFields = {};
  values.forEach((val) => {
    resFields[val] = reqUser[val];
  });

  responce["success"] = true;
  responce["user"] = resFields;
  responce.user._id = reqUserId;
  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/logout", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  await Session.findOneAndDelete({ _id: userId });

  const responce = { success: true, msg: "user session removed" };
  res.json({ ...responce, signature: signature(responce) });
});

Router.get("/feed", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  const postLength = parseInt(req.query.post) || 5;
  const pageIndex = parseInt(req.query.page) || 1;
  const responce = {};

  const userPostItem = await Post.findOne({ _id: userId });
  if (!userPostItem) {
    responce["success"] = false;
    responce["error"] = { msg: "Feed is empty", code: 29 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  const allPosts = userPostItem.feed;
  const totalPages = Math.ceil(allPosts.length / postLength);

  const pageEndIndex = postLength * pageIndex;

  if (!totalPages) {
    responce["success"] = false;
    responce["error"] = { msg: "Feed is empty", code: 29 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  if (pageIndex > totalPages) {
    responce["success"] = false;
    responce["error"] = { msg: "Page out of index", code: 13 };
    return res.json({ ...responce, signature: signature(responce) });
  }

  responce["success"] = true;
  responce["userId"] = userId;
  responce["post"] = [];

  if (totalPages === pageIndex) {
    for (let i = pageEndIndex - postLength; i < allPosts.length; i++) {
      responce["post"].push(allPosts[i]);
    }
  } else {
    for (let i = pageEndIndex - postLength; i < pageEndIndex; i++) {
      responce["post"].push(allPosts[i]);
    }
  }

  responce["currentPages"] = pageIndex;
  responce["totalPages"] = totalPages;
  return res.json({ ...responce, signature: signature(responce) });
});

Router.post("/image", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  const option = req.body.upload;
  const userDB = await User.findOne({ _id: userId });

  const fileName = sha512(
    Math.ceil(Math.random() * 10000).toString() + uuid() + userId
  );
  const response = {};

  // Validating extension
  const validExtensions = ["png", "jpg", "jpeg", "webp", "gif"];
  if (!validExtensions.includes(req.body.extension)) {
    response["success"] = false;
    response["error"] = { msg: "Invalid Extension", code: 30 };
    return res.json({ ...response, signature: signature(response) });
  }

  // Delete previous image if necessary
  const imageField = option === "pf" ? "profileImg" : "bgImg";
  const imageFieldSplit = userDB[imageField].split("/");
  const imageName = imageFieldSplit[imageFieldSplit.length - 1];
  if (imageName) {
    imagekit.listFiles(
      { skip: 0, limit: 1, searchQuery: `name="${imageName}"` },
      function (fError, files) {
        if (fError) console.log(fError);
        const fileId = files[0]?.fileId;
        if (fileId) {
          imagekit.deleteFile(fileId, function (error, result) {
            if (error) console.log(error);
          });
        }
      }
    );
  }

  // Upload new image
  imagekit.upload(
    {
      file: req.body.data.split("base64,")[1], // Required image data in base64 format
      fileName: `${fileName}.${req.body.extension}`, // Required image file name
    },
    function (error, result) {
      if (error) {
        response["success"] = false;
        response["error"] = { msg: "Something went wrong", code: 31 };
        return res.json({ ...response, signature: signature(response) });
      }

      response["success"] = true;
      response["link"] = result.url;
      res.json({ ...response, signature: signature(response) });
    }
  );
});

module.exports = Router;
