import express from "express";
import createtk from 'jsonwebtoken'
import passport from 'passport'
import home from "../controller/homeCtrl.js";
import jwt from '../middleware/jwtcheck.js'
import cors from 'cors'
const router = express.Router()
const webroute = (app) => {

    router.get('/', home.homeView)
    router.get('/test', home.testView)
    router.post('/add', home.addView)
    router.get('/service', jwt.jwtcheck, home.serviceView)

    return app.use('/', router)
}
const user = (app) => {
    router.post('/upload', home.upload.single('sin_file'), home.uploadDone)
    router.post('/mul_upload', home.upload.array('mul_file', 10), home.uploadDone)
    router.get('/upload/', home.uploadWiew)
    router.get('/detail/:id', home.detailView)
    router.get('/update/:id', home.updateView)
    router.post('/add', home.addView)
    router.post('/delete/:userid', home.delUser)
    router.post('/updatedone/:id', home.updateDone)
    router.get('/login', home.getloginView)
    router.post('/login',  (req, res, next) =>{
        passport.authenticate('local', (err, user, info) => {
        
            if (err) { next(err) }
            if (!user) {
                next(info)
            }
            
            
            createtk.sign({ 'sub': user.username }, 'minh', { expiresIn: 30000 }, (err, data) => {
                if(err){next(err)}
                res.cookie('token', data, { httpOnly: true })
                return res.redirect("/")
            })

        })(req, res, next)
    })
    router.get('/register', home.registerView)
    router.post('/register', home.postregisterView)
    router.get('/logout', (req, res) => {
        res.cookie('token', '', { maxAge: 0 })
        res.redirect('/');
    })
    return app.use('/user', router)
}
const api = (app) => {
    router.get('/testapi', home.testAPI)
    router.post("/newapi", home.newAPI)
    router.put("/updateapi/:id", home.updateDone)
    router.delete("/deleteapi/:userid", home.delUser)
    return app.use('/api', cors( {origin: '*'}),router)
}
export { webroute, user, api }
