
const mongoose = require('mongoose');

// สร้าง Collection ของสินค้า ด้วย mongoose
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type:Number,
        required: true
    }
})


const Product = mongoose.model('Product', productSchema);
