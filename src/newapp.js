import express from 'express'
import cors from 'cors'
import __dirname from 'path'
import morgan from 'morgan' //logging
import 'dotenv/config'
import {webroute ,user,api} from './route/url.js'
import cookieParser from 'cookie-parser'
import { verify_user } from './middleware/passport.js'
import local_str from 'passport-local'
import passport from 'passport'
const app = express()
const port =3000 

passport.use(new local_str(verify_user) )


app.use(morgan('combined'))
// app.use(cors()) 
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(cookieParser())
app.use('/',express.static('./src/static/'))
app.use('/user/',express.static('./src/static/user'))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

webroute(app)
user(app)
api(app)



// error func 
let err = (err,req,res,next)=>{
  res.status(404).json(err)
}

app.use(err)



 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
