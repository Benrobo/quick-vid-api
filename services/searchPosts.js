const conn = require("../db/db")
const { Error } = require("../helpers/index")


const searchPosts = ({ text }, res) => {
    if (text === "") {
        return res.status(400).json(Error("No data provided or some fields are empty", 400))
    }
    // search posts
    try {
        let searchwrd = text.split("")[0].toUpperCase() + text.slice(1)
        let sql = "SELECT * FROM posts WHERE title LIKE '%" + searchwrd + "%' "
        conn.query(sql, (err, data) => {
            if (err) {
                return res.status(500).json(Error("Something went wrong, please try again", 500))
            }

            return res.status(200).json(data.rows)
        })

    } catch (e) {
        return res.status(500).json({ e, error: Error("Something went wrong", 500) })
    }

}


module.exports = searchPosts