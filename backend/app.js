const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors =require('cors');


// env สำหรับสร้าง path ให้กับ api 
// middleware
require('dotenv/config');
// express สำหรับรับค่า json ก่อนสร้างสินค้าต้องใส่ไว้ด้านบนเท่านั้น
app.use(bodyParser.json());
// Morgan - ให้การเก็บ Request Log
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());



// Routes
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');

const api = process.env.API_URL;

// ตั้งค่า Router สำหรับใช้งาน api ต่างๆ
app.use(`${api}/products`,productsRouter);
app.use(`${api}/categories`,categoriesRouter);
app.use(`${api}/orders`,ordersRouter);
app.use(`${api}/users`,usersRouter);


// สร้างการเชื่อมต่อกับ database mogoDB cloud
// Database
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

// Server
app.listen(3000, ()=>{
    console.log(api);
    console.log("Server is running http://localhost:3000");
});