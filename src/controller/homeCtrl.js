import db from '../models/model.js'
import multer from 'multer'
import mysql2 from 'mysql2/promise'
import jwt from 'jsonwebtoken'
const conn = mysql2.createPool({ host: 'localhost', user: 'root', database: 'nodejs' });
// const pool =  conn.promise()
const homeView = async (req, res) => {
    let tk = req.cookies.token
    console.log(JSON.stringify( req.headers.cookie));

    jwt.verify(tk, 'minh', async (err, payload) => {
        if (err) {

            let data = 'User'
            const [rows, fields] = await conn.execute("select * from users")

            res.render("home", { data: rows, user: data })
        } else {
            let data = payload.sub

            const [rows, fields] = await conn.execute("select * from users")

            res.render("home", { data: rows, user: data })
        }
    })

    // const [rows, fields] = await conn.execute("select * from users")
    // const [usr, f] = await conn.execute("select username from auth where username = ?", [req.cookie.token])
    // res.render("home", { data: rows })

}
const testView = (req, res) => {
    return res.json({data:"some data"})
    
    // return res.send("test")
}
const detailView = async (req, res) => {

    const [rows, fields] = await conn.execute("select * from users where id = ? ", [req.params.id])

    res.render("detail", { 'data': rows })

}
const addView = (req, res) => {

    let { name, age, phone, addr, bio, birth } = req.body

    db.connection
        .then(conn => conn.execute("INSERT INTO users (Name, Age, Phone, Address,Bio,Birthday)VALUES (?, ?, ?, ?,?,?)", [name, age, phone, addr, bio, birth]))
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
}

const delUser = (req, res) => {
    let uid = req.params.userid
    conn.execute('delete from users where id=?', [uid])
    res.redirect("/")
    // db.connection
    //     .then(conn => { return conn.execute('delete from users where id=?', [uid]) })
    //     .then(() => { return res.redirect("/") })
    //     .catch(err => console.log(err))


}
const updateView = (req, res) => {
    let uid = req.params.id
    db.connection
        .then(conn => conn.execute("select * from users where id =?", [uid]))
        .then(data => res.render("update.ejs", { data: data[0][0] }))

}
const updateDone = (req, res) => {
    let { name, age, phone, addr, bio, birth } = req.body

    db.connection
        .then(conn => conn.execute("UPDATE users SET Name = ?, Age = ?,Phone = ?, Address = ?,Bio = ?, Birthday = ? WHERE id = ?", [name, age, phone, addr, bio, birth, req.params.id]))
        .then(data => res.redirect("/"))
        .catch(err => console.log(err))

}
const testAPI = (req, res) => {
    db.connection
        .then(conn => conn.execute("select * from users"))
        .then(data => {
            res.cookie('test','testcookie') 
            return res.status(200).json({ data: data[0] }) })
        


}
const newAPI = async (req, res) => {
    let { name, age, phone, addr, bio, birth } = req.body


    db.connection
        .then(conn => conn.execute("INSERT INTO users (Name, Age, Phone, Address,Bio,Birthday)VALUES (?, ?, ?, ?,?,?)", [name, age, phone, addr, bio, birth]))
        .then((data) => console.log(data))
        .catch(err => console.log(err))


}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/static/image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname + '-' + Math.round(Math.random() * 10000000))
    }
})

let upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(png|jpg|pdf|docx)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a file'), false)
        }
        cb(undefined, true)
    }
})
const uploadWiew = (req, res) => {
    res.render('upload.ejs')
}
const uploadDone = (req, res) => {
    res.redirect('/')
}

const getloginView = (req, res) => {
    res.render('login.ejs', { data: '' })
}
const postloginView = (req, res) => {
    db.checkuser(req, res)

}
const registerView = (req, res) => {
    res.render('register.ejs', { data: '' })
}
const postregisterView = (req, res) => {
    // console.log(req.body);
    // console.log(conn);
    let { username, password } = req.body
    conn.getConnection()
        .then(conn => conn.execute("INSERT INTO auth (username,password) VALUES (?,?)", [username, password]))
        .then(data => {
            let token = jwt.sign({ 'sub': username }, 'minh', { expiresIn: 30000 })
            res.cookie("token", token, { httpOnly: true })
            return res.redirect('/user/login')
        })


        .catch(err => { return res.render('register.ejs', { data: 'Username not valid' }) })
}


const serviceView = (req, res) => {
        let user = req.data.sub
        res.render("service.ejs", { user: user })

}









export default { serviceView, postregisterView, registerView, postloginView, getloginView, upload, uploadDone, homeView, detailView, addView, delUser, updateView, updateDone, testAPI, newAPI, testView, uploadWiew }

