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
import http from 'http'
import {Server, Socket} from 'socket.io'
const app = express()
const port = process.env.PORT
// io = io(http.Server(app))
const host = http.createServer()
const io = new Server(host)
io.on('connection', client => {
  client.on('event', data => { console.log('conn'); });
  client.on('disconnect', () => {console.log('dis');});
});
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
