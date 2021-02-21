const express = require('express');
const { models } = require('mongoose');

const router = express.Router()

router.get('/' ,(req,res) => {
    res.render('index')
});


module.exports = router;