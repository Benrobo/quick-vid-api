const conn = require("../db/db")
const { Error, genId } = require("../helpers/index")


const savePosts = ({ videoId, userId, username, title, embedUrl }, res) => {
    if (videoId === "" || userId === "" || username === "" || title === "" || embedUrl === "") {
        return res.status(400).json(Error("No data provided or some fields are empty", 400))
    }

    let newid = genId()
    // insert into table
    try {
        // check if user with that id exist
        let sql = "SELECT * FROM users WHERE id=$1";
        conn.query(sql, [userId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error("Something went wrong saving posts, please try again", 500))
            }

            if (result.rowCount === 0) {
                return res.status(404).json(Error("Post could not get added, cause User does not exist", 404))
            }

            // insert record
            // id | userName | userId | title | videoId | videoUrl | videoImage | created_at
            let thumbnail = `https://avatars.dicebear.com/api/initials/${title}.svg`
            let sql = `INSERT INTO posts(id,"userName","userId","title","videoUrl","videoId","videoImage") VALUES($1,$2,$3,$4,$5,$6,$7)`
            conn.query(sql, [newid, username, userId, title, embedUrl, videoId, thumbnail], (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(Error("Something went wrong saving posts, please try again", 500))
                }
                return res.status(200).json({ msg: "Posts added successfully", code: 200 })
            })
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ e, error: Error("Something went wrong", 500) })
    }

}


module.exports = savePosts