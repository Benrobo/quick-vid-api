const conn = require("../db/db")
const { Error, genId } = require("../helpers/index")


const saveComments = ({ userId, videoId, comment, userName }, res) => {
    if (userId === "" || comment === "" || videoId === "" || userName === "") {
        return res.status(400).json(Error("No data provided or some fields are empty", 400))
    }
    let newid = genId()
    // insert into table
    try {
        // check if user with that id exist
        let sql = `SELECT users.id, posts.title, users.image, posts."userId", posts."videoImage", posts."userName" FROM users INNER JOIN posts ON users.id=$1 WHERE posts."videoId"=$2`;
        conn.query(sql, [userId, videoId], (err, result) => {
            if (err) {
                return res.status(500).json(Error("Something went wrong saving posts, please try again", 500))
            }

            if (result.rowCount === 0) {
                return res.status(404).json(Error("Post could not get added, cause User does not exist", 404))
            }

            let {
                id,
                title,
                image,
                userId,
                videoImage,
            } = result.rows[0]

            // insert record
            let sql = `INSERT INTO comments(id,"userId","userName","userImg","postTitle","postImg","videoId", text) VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
            conn.query(sql, [newid, userId, userName, image, title, videoImage, videoId, comment], (err, data) => {
                if (err) {
                    return res.status(500).json(Error("Something went wrong inserting comments, please try again", 500))
                }
                return res.status(200).json({ msg: "Comments added successfully", code: 200 })
            })
        })

    } catch (e) {
        return res.status(500).json({ e, error: Error("Something went wrong", 500) })
    }

}


module.exports = saveComments