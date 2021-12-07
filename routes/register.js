const express = require("express");
const router = express.Router();


const registerUser = require("../services/registerUser");


router.post("/register", (req, res) => {
    let data = req.body;
    return registerUser(data, res)
})

module.exports = router