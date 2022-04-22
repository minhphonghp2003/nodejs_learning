import express from 'express'
import __dirname from 'path'
import morgan from 'morgan' //log info
import 'dotenv/config'
import url from './route/url.js'
import mysql from 'mysql2'
const app = express()
const port = process.env.PORT

app.use(morgan('combined'))
// ViewEng
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static('./src/static/'))

url(app)

// database


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodejs'
});

// simple query

// with placeholder

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// console.log(typeof(connection)
export {connection}