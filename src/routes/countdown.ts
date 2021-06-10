import * as express from "express";
import randomstring from "randomstring";
var router = express.Router()

const countdownClock = require('../schema/clockSchema')

router.get("/", async (req, res) => {
    if(!req.query.code) return res.redirect('/')

    var info
    
    const data = await countdownClock.findOne({clockId: req.query.code}, (err, data)=> {
        if(err) throw err
        info = data
    })

    res.render('countdown', {
        eventName: info.eventName,
        formed: info.formedDate
    })
})


module.exports = router;
