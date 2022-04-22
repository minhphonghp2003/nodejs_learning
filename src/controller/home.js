import {connection} from '../index.js'
const homeView = (req,res)=>{
    let data = []
    connection.query(
        'SELECT * FROM `users` ',
        (err, results, fields) =>{
            results.forEach(element => {
                
                data.push(element)
            });
            // console.log(JSON.parse(JSON.stringify(data))[0])
         return res.render("home",{'data': data})
        } )
      
    
}
const detailView = (req,res)=>{
    return res.render("detail")
}

export default {homeView, detailView}
    
