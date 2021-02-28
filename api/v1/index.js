const express = require('express');
const router = express.Router();
const DataGenController = require('../../controller/DataGenController');

// v1 API
router.get('/',(req,res, next) => {
    res.send('From API route v1')
})

router.get('/datagen/:type', DataGenController.genData);

module.exports = router
