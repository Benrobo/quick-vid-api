const conn = require("../db/db")
const { Error } = require("../helpers/index")

const getPosts = (videoId, res) => {
    try {
        let cheksql = `SELECT * FROM posts WHERE "videoId"=$1`
        conn.query(cheksql, [videoId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error("Something went wrong registering organization", 500))
            }
            if (result.rowCount === 0) {
                return res.status(404).json(Error("This video isn't available anymore", 404))
            }

            return res.status(200).json(result.rows)
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ e, error: Error("Something went wrong", 500) })
    }

}


module.exports = getPosts