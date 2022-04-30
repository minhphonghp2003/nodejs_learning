import db from '../models/model.js'

const verify_user = async (username, password, cb) => {
    try {

        const [rows] = await db.pool.execute('select * from auth where username = ?', [username])
        // console.log(rows);
        let usr = rows[0]
        // console.log(usr);
        if(!usr){
             return cb(null, false, { message: 'Incorrect username.' })
        }
        if(password != usr.password){
            return cb(null, false, { message: 'Incorrect password.' })
        }
        
        return cb(null,usr)
    
    } catch (err) {
        
        return cb(err)
    }
}

export {verify_user}