const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth")

const getPosts = require("../services/getPosts")

router.get("/posts/all", (req, res) => {
    return getPosts(res)
})

module.exports = router