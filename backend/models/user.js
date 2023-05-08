const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: '',
    },
    street: {
        type: String,
        default: '',
    },
    distrct: {
        type: String,
        default: '',
    },
    subDistrct: {
        type: String,
        default: '',
    },
    province: {
        type: String,
        default: '',
    },
    zipCode: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
})

userSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    const {_id:id, ...result} = object;
    return {...result,id};
})

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
