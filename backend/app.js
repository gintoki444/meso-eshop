const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


// env สำหรับสร้าง path ให้กับ api
require('dotenv/config');
const api = process.env.API_URL;


// express สำหรับรับค่า json ก่อนสร้างสินค้าต้องใส่ไว้ด้านบนเท่านั้น
app.use(bodyParser.json());

// Morgan - ให้การเก็บ Request Log
app.use(morgan('tiny'));



// api สำหรับกาแสดงรายละเอียดของสินค้า
app.get(`${api}/products`, async (req, res)=>{

    // เราจะมีการใช้งาน asyne และ await สำหรับตั้งก่อน ก่อนการรันเพื่อให้ไม่เกิด error
    const productList = await Product.find();

    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
}) 
// api สำหรับสร้าง/เพิ่มข้อมูลสินค้า
app.post(`${api}/products`, (req, res)=>{
    // รับค่าจาก form
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
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

// สร้างการเชื่อมต่อกับ database mogoDB cloud
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'meso-eshop-database'
})
.then(()=>{
    console.log('Database connection Start!! ');
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    console.log(api);
    console.log("Server is running http://localhost:3000");
});