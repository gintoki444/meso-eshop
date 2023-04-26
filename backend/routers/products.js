const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();

// api สำหรับกาแสดงรายละเอียดของสินค้า
router.get(`/`, async (req, res)=>{

    // เราจะมีการใช้งาน asyne และ await สำหรับตั้งก่อน ก่อนการรันเพื่อให้ไม่เกิด error
    const productList = await Product.find();

    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
}) 
// api สำหรับสร้าง/เพิ่มข้อมูลสินค้า
router.post(`/`, (req, res)=>{
    // รับค่าจาก form
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    // ส่งค่าเข้าสู่ Database
    product.save().then((createdProduct =>{
        res.status(201).json(createdProduct)
    })).catch((err) =>{
        res.status(500).json({
            error:err,
            success: false
        })
    })
})

module.exports = router;