const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res)=>{

    // เราจะมีการใช้งาน asyne และ await สำหรับตั้งก่อน ก่อนการรันเพื่อให้ไม่เกิด error
    const orderList = await Order.find();

    if(!orderList){
        res.status(500).json({success:false})
    }
    res.send(orderList);
}) 

module.exports = router;