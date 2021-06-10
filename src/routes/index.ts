import * as express from "express";
var router = express.Router()

const createClock = require("./create")
router.use('/create', createClock)

const countDown = require("./countdown")
router.use('/countdown', countDown)


router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router;
