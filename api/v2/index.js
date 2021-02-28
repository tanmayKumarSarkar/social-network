const express = require('express')
const router = express.Router()

router.get('/',(req,res, next) => {
    res.send('From API route v2')
})

module.exports = router