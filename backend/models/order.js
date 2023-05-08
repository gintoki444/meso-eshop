const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type:Number,
        required: true
    }
})

orderSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    const {_id:id, ...result} = object;
    return {...result,id};
})


exports.Order = mongoose.model('Order', orderSchema);
