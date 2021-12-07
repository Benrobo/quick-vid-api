const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth")

const saveComment = require("../services/addComment")

router.post("/addComment", checkAuth, (req, res) => {
    let data = req.body;
    return saveComment(data, res)
})

module.exports = router