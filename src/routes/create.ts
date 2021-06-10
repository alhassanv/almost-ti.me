import * as express from "express";
import randomstring from "randomstring";
var router = express.Router()

const countdownClock = require('../schema/clockSchema')

router.get("/", (req, res) => {
    res.render("createCountdown")
})

router.get('/submit', (req, res) => {
    console.log(req.query.day)
    const newClock = new countdownClock({
        clockId: randomstring.generate(8),
        formedDate: `${req.query.month} ${req.query.day}, ${req.query.year}`,
        eventName: `${req.query.eventName}`
    })
    newClock.save().then(() => {
        setTimeout(function(){
            res.redirect(`/countdown/?code=${newClock.clockId}`)
        },1000);
        
    })
})

module.exports = router;
