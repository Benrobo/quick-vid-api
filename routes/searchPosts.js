const express = require("express");
const router = express.Router();

const searchPosts = require("../services/searchPosts")

router.post("/posts/search", (req, res) => {
    let data = req.body;
    return searchPosts(data, res)
})

module.exports = router