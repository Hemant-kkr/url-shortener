const express = require('express');
const router = express.Router();
const {generateShortURL}=require('../controllers/url')
 router.post('/',generateShortURL)
 module.exports=router;