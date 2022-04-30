
import mysql from 'mysql2/promise'
import jwt from 'jsonwebtoken'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs'
});
// console.log(typeof(pool));
const connection = pool.getConnection()
// console.log(connection);
// const [rows, fields] = connection.execute('SELECT * FROM auth ')

// const authconn = mysql.createPool({host:'localhost', user: 'root', database: 'nodejs'});

const showdb = (req,res) => {
    const [rows, fields] =  pool.execute('SELECT * FROM user ')
    console.log(rows);
    // connection
    //     .then(data => { return data.execute('select * from users') })
    //     .then((row) => { return res.render("home", { data: row[0] }) })
    //     .catch(err => { console.log(err) })


}

const detaildb=(req,res)=>{
    // connection

    //     .then(conn => { return conn.execute(`select * from users where id = ? `, [req.params.id]) })
     
    //     .then(data => { return res.render("detail", { 'data': data[0][0] }) })
    //     .catch(err => { return console.log(err) })
    const [rows, fields] =  pool.execute('SELECT * FROM user where id = ? ', [req.params.id]) 
    console.log(rows);

}


const checkuser= async(req,res)=>{
    let { username, password } = req.body
    // const connection = await pool.getConnection()
    const [rows, fields] = await pool.execute('SELECT * FROM auth WHERE username = ? and password = ?', [username, password]);
    // console.log(fields);
    if (rows[0]) {
        let token = jwt.sign({sub:rows[0].username},'minh',{expiresIn:30000})
        res.cookie('token',token,{httpOnly:true})
        return res.redirect("/")
    } else {
        return res.render("login.ejs",{data:'Invalid account'});
    }

    }

export default {showdb,detaildb,connection,checkuser,pool}

