const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res)=>{

    // เราจะมีการใช้งาน asyne และ await สำหรับตั้งก่อน ก่อนการรันเพื่อให้ไม่เกิด error
    const userList = await User.find();

    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
}) 

module.exports = router;