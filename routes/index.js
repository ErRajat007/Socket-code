const express = require('express');
const router = express.Router();

const userController= require('../controllers/userControllers')

router.get('/getdata',userController.getAllusers)
router.post('/setData',userController.setAllusers)

module.exports=router