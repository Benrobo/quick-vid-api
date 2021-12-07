const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth")

const getComments = require("../services/getComments")

router.post("/posts/comments", (req, res) => {
    let data = req.body;
    return getComments(data, res)
})

module.exports = router