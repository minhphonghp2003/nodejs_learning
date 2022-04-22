import express from "express";
import  home  from "../controller/home.js";
const router = express.Router()
const webroute = (app)=>{

    router.get('/',home.homeView )
    router.get('/detail',home.detailView)
    return app.use('/', router)
}

export default webroute
