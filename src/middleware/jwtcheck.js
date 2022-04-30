import jwt from 'jsonwebtoken'

const jwtcheck = (req, res, next) => {
    let usrtoken = req.cookies.token
   
    
         jwt.verify(usrtoken,'minh',(err,payload)=>{
            if (err) {
                res.redirect('/user/login')
                next()
            } else {
                req.data = payload
                next()

            }
        })
    
}

export default { jwtcheck }