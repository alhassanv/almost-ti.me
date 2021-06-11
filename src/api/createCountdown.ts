import { resolveNaptr } from "dns";
import * as express from "express";
import randomstring from "randomstring";

var router = express.Router()
const countdownClock = require('../schema/clockSchema')

router.get('/', (req, res) => {
  res.send({statusCode: 400, error: "Bad Request - Missing type from request."})
})

router.get('/:type', (req, res) => {
    var type = req.params.type
     if(type == "create"){
        
        if(!req.query.month) return res.send({statusCode: 200, error: "Bad Request - Missing 'month' value from request."})
        if(!req.query.day) return res.send({statusCode: 200, error: "Bad Request - Missing 'day' value from request."})
        if(!req.query.year) return res.send({statusCode: 200, error: "Bad Request - Missing 'year' value from request."})
        if(!req.query.eventName) return res.send({statusCode: 200, error: "Bad Request - Missing 'eventName' value from request."})
        
        const data = new countdownClock({
            clockId: randomstring.generate(8),
            formedDate: `${req.query.month} ${req.query.day}, ${req.query.year}`,
            eventName: `${req.query.eventName}`
        })

        data.save().then(() => {
            var response = {
                statusCode: 201,
                message: 'Completed function',
                dataSubmitted: {
                    clockId: randomstring.generate(8),
                    formedDate: `${req.query.month} ${req.query.day}, ${req.query.year}`,
                    eventName: `${req.query.eventName}`,
                    internalId: data._id,    
                },
                dataReturned: {
                    url: `https://almost-ti.me/countdown?code=${data.clockId}`
                }
            }

            res.send(JSON.stringify(response));
        })

    } else {
        res.send({statusCode: 400, error: "Bad Request - Unable to determine type."})
    }
})

module.exports = router;
