require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());

app.use("/quick-vid/api/", require("./routes/register"))
app.use("/quick-vid/api/", require("./routes/logIn"))
app.use("/quick-vid/api/", require("./routes/addPosts"))
app.use("/quick-vid/api/", require("./routes/getPosts"))
app.use("/quick-vid/api/", require("./routes/searchPosts"))
app.use("/quick-vid/api/", require("./routes/getPostVid"))
app.use("/quick-vid/api/", require("./routes/addComment"))
app.use("/quick-vid/api/", require("./routes/getComments"))


// get products
const PORT = process.env.PORT | 5000

app.get("/", (req, res) => {
    return res.json({ msg: "hey welcome to kwickquick" })
})


app.listen(PORT, "0.0.0.0")
