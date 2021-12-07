const conn = require("../db/db")
const { Error } = require("../helpers/index")

const getComments = ({ videoId }, res) => {
    if (videoId === "") {
        return res.status(400).json(Error("No data provided or some fields are empty", 400))
    }
    try {
        let cheksql = `SELECT * FROM comments WHERE "videoId"=$1`
        conn.query(cheksql, [videoId], (err, data) => {
            if (err) {
                return res.status(500).json(Error("Something went wrong fetching comments", 500))
            }

            return res.status(200).json(data.rows)
        })

    } catch (e) {
        return res.status(500).json({ e, error: Error("Something went wrong", 500) })
    }

}


module.exports = getComments