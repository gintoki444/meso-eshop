const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors =require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler);



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