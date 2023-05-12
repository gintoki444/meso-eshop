const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// api แสดงข้อมูลสินค้าทั้งหมด
router.get(`/`, async (req, res) => {

    // http://localhost:3000/api/v1/products?categories=123,234
    let filter = {}
    if(req.query.categories){
        filter = { category : req.query.categories.split(',')}
    }

    // .fild จะเป็นการแสดงข้อมูลทั้งหมด และใช้ populate ในการแสดงข้อมูลของ category ด้วย
    const product = await Product.find(filter).populate('category');

    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
})

// api แสดงข้อมูลสินค้า ตาม ID
router.get(`/:id`, async (req, res) => {

    const product = await Product.findById(req.params.id).populate('category');

    if(!product){
        res.status(500).json({message:" The Product with the given ID was not found...."});
    }
    res.status(200).send(product);
})


// api สำหรับสร้าง/เพิ่มข้อมูลสินค้า
router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    
    const newProduct = await product.save();

    if(!newProduct) return res.status(500).send('The pruduct cannot br created!')

    res.send(newProduct);

})

// api แก้ไขข้อมูลสินค้า
router.put('/:id', async (req,res) =>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product')
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        {new: true}
    )

    if (!product)
        return res.status(404).send('the Product cannot be created!');
    res.send(product);
})


// api ลบข้อมูลสินค้า
router.delete('/:id', (req,res) =>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success: true, message: 'The product Deleted !'})
        }else {
            return res.status(404).json({success: false, message: ' The product not false !'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error:err})
    })
})

// api นับจำนวนสินค้า
router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments();

    if(!productCount){
        res.status(500).json({success : false});
    }
    res.send({
        productCount : productCount
    });
})


// api sแสดงรายการสินค้าตามสถานะของ isFeatured 
router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured:true}).limit(+count);

    if(!products){
        res.status(500).json({success : false});
    }
    res.send(products);
})

module.exports = router;