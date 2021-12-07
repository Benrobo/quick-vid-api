const express = require("express");
const router = express.Router();

const loginUser = require("../services/loginUser")

router.post("/login", (req, res) => {
    let data = req.body;
    return loginUser(data, res)
})

module.exports = router