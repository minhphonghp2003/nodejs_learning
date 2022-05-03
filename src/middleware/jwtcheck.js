import jwt from 'jsonwebtoken'
import fs from 'fs'

const jwtcheck = (req, res, next) => {
    let usrtoken = req.cookies.token

    let pub_key = fs.readFileSync('jwtRS256.key.pem')
    console.log(usrtoken);
    jwt.verify(usrtoken, pub_key,{ algorithm: 'RS256' }, (err, payload) => {
        console.log(payload);
        if (err) {
            console.log(err);
            res.redirect('/user/login')
            next()
        } else {
            req.data = payload
            next()

        }
    })

}

export default { jwtcheck }