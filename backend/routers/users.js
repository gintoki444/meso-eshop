const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res)=>{

    const userList = await User.find();
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
}) 

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        address: req.body.address,
        street: req.body.street,
        distrct: req.body.distrct,
        subDistrct: req.body.subDistrct,
        province: req.body.province,
        zipCode: req.body.zipCode,
        country: req.body.country
    })

    user = await user.save();
    if (!user)
        return res.status(404).send('the user cannot be created!');
    res.send(user);
})

module.exports = router;