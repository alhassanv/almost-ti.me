import * as express from "express";
var router = express.Router()

const create = require('./createCountdown')
router.use("/post", create)

router.get('/', (req, res) => {
    res.send({statusCode: 200, message: "OK"})
})

module.exports = router;
