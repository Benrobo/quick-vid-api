const conn = require("../db/db")
const { Error, compareHash, genRefreshToken, genAccessToken } = require("../helpers/index")


const loginUser = ({ email, password }, res) => {
    if (email === "" || password === "" || !email || !password || email === undefined || password === undefined) {
        return res.status(400).json(Error("No data provided or some data is missing", 400))
    }

    // check if user with that email exists

    try {
        let sql = `SELECT * FROM users WHERE mail=$1`
        conn.query(sql, [email], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error("Something went wrong logging user in", 500))
            }

            if (data.rowCount === 0) {
                // org doesnt exist
                return res.status(404).json(Error("user with that email was not found", 404))
            }

            let userData = {
                id: data.rows[0].id,
                username: data.rows[0].name,
                email: data.rows[0].mail
            }

            // check if password matches hash
            let dbHash = data.rows[0].hash
            const pwdCheck = compareHash(password, dbHash);

            if (!pwdCheck) {
                return res.status(404).json(Error("No user found with that email or password", 404))
            } else {

                let refreshToken = genRefreshToken(userData)
                let accessToken = genAccessToken(userData)

                // update the refreshToken table in db
                let sql2 = `UPDATE users SET "refreshToken"=$1 WHERE mail=$2`
                conn.query(sql2, [refreshToken, email], (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json(Error("Something went wrong logging user in", 500))
                    }
                    return res.status(200).json({
                        users: userData,
                        refreshToken,
                        accessToken
                    })
                })


            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ e, error: Error("Something went wrong", 500) })
    }

}


module.exports = loginUser