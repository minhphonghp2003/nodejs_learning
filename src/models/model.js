
import mysql from 'mysql2/promise'
import jwt from 'jsonwebtoken'

import fs from 'fs';

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

const showdb = (req, res) => {
    const [rows, fields] = pool.execute('SELECT * FROM user ')
    console.log(rows);
    // connection
    //     .then(data => { return data.execute('select * from users') })
    //     .then((row) => { return res.render("home", { data: row[0] }) })
    //     .catch(err => { console.log(err) })


}

const detaildb = (req, res) => {
    // connection

    //     .then(conn => { return conn.execute(`select * from users where id = ? `, [req.params.id]) })

    //     .then(data => { return res.render("detail", { 'data': data[0][0] }) })
    //     .catch(err => { return console.log(err) })
    const [rows, fields] = pool.execute('SELECT * FROM user where id = ? ', [req.params.id])
    console.log(rows);

}

// console.log(cert);
const checkuser = async (req, res) => {
    let { username, password } = req.body
    let pr_key = fs.readFileSync('jwtRS256.pem');
    // const connection = await pool.getConnection()
    const [rows, fields] = await pool.execute('SELECT * FROM auth WHERE username = ? and password = ?', [username, password]);
    // console.log(fields);
    if (rows[0]) {
        jwt.sign({ sub: rows[0].username }, pr_key, { algorithm: 'RS256' }, (err, token) => {
            if (err) {
                console.log(err);
            }

            console.log(token);
            res.cookie('token', token, { httpOnly: true })
            return res.redirect("/")
        })

    } else {
        return res.render("login.ejs", { data: 'Invalid account' });
    }

}

export default { showdb, detaildb, connection, checkuser, pool }

