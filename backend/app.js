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
app.get(`${api}/products`, (req, res)=>{
    const product = {
        id: 1,
        name: 'cosmelan pack',
        image: 'some_url',
    }
    res.send(product);
}) 
// api สำหรับสร้างสินค้า
app.post(`${api}/products`, (req, res)=>{
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
})

// สร้างการเชื่อมต่อกับ database mogoDB cloud
mongoose.connect(process.env.CONNECTION_STRING)
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