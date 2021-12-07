const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth")

const savePosts = require("../services/addPosts")

router.post("/addPosts", checkAuth, (req, res) => {
    let data = req.body;
    console.log(data)
    return savePosts(data, res)
})

module.exports = router