const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth")

const getPostVid = require("../services/getPostVid")

router.post("/posts/video", (req, res) => {
    let { vidId } = req.body;
    return getPostVid(vidId, res)
})

module.exports = router