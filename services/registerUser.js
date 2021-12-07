const conn = require("../db/db")
const { Error, genId, genPwdHash } = require("../helpers/index")


const registerUser = ({ username, email, password }, res) => {
    try {
        if (username === "" || email === "" || password === "") {
            return res.status(400).json(Error("No data provided", 400))
        }

        let imageApi = `https://avatars.dicebear.com/api/initials/`
        let Id = genId()
        let userImg = `${imageApi}${username}.svg`;
        let hash = genPwdHash(10, password);
        // check if users  with email exist
        let isExist = false;
        let cheksql = `SELECT * FROM users WHERE mail=$1`
        conn.query(cheksql, [email], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error("Something went wrong registering user", 500))
            }

            if (data.rowCount > 0) {
                return res.status(400).json(Error("user with that email already exist", 400))
            }
            else {
                //  id | name | mail | hash | image | refreshToken | created_at
                let defaultRefreshToken = 0;
                let sql = `INSERT INTO users(id,name,mail,hash,image,"refreshToken") VALUES($1,$2,$3,$4,$5,$6)`
                conn.query(sql, [Id, username, email, hash, userImg, defaultRefreshToken], (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json(Error("Something went wrong registering user", 500))
                    }

                    return res.status(200).json({ message: "user registered successfully", code: 200 })
                })
            }
        })

    } catch (e) {
        return res.status(500).json({ e, error: Error("Something went wrong", 500) })
    }

}


module.exports = registerUser