const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// api แสดงข้อมูล user ทั้งหมด
router.get(`/`, async (req, res)=>{

    const userList = await User.find().select('-passwordHash');
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
}) 

// api แสดงข้อมูล user ตาม ID
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user){
        res.status(500).json({message:" The user with the given ID was not found...."});
    }
    res.status(200).send(user);
})

// api สำหรับเพิ่มผู้ใช้งาน สำหรับ admin
router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
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


// api สำหรับแก้ไขข้อมูล user
router.put('/:id', async (req,res) =>{
    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid user')
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            address: req.body.address,
            street: req.body.street,
            distrct: req.body.distrct,
            subDistrct: req.body.subDistrct,
            province: req.body.province,
            zipCode: req.body.zipCode,
            country: req.body.country
        },
        {new: true}
    )

    if (!user)
        return res.status(404).send('the User cannot be created!');
    res.send(user);
})


// api สำหรับให้ user login
// router.post('/login', async (req, res) =>{
//     const user = await User.findOne({email: req.body.email});
//     const secret = process.env.secret

//     if(!user){
//         return res.status(400).send("The user not found");
//     }

//     if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
//         const token = jwt.sign(
//             {
//                 userId: user.id,
//                 isAdmin: user.isAdmin,
//             },
//             secret,
//             {expiresIn: '1d'}
//         )

//         return res.status(200).send({user: user.email, token: token});
//     } else {
//         res.status(400).send("password is wrong!");
//     }
// })

// api สำหรับสมัครสมาชิก
router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})

router.post('/register', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
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


// api นับจำนวน user
router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments();

    if(!userCount){
        res.status(500).json({success : false});
    }
    res.send({
        userCount : userCount
    });
})

// api ลบข้อมูล user
router.delete('/:id', (req,res) =>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user){
            return res.status(200).json({success: true, message: 'The user Deleted !'})
        }else {
            return res.status(404).json({success: false, message: ' The user not false !'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error:err})
    })
})


module.exports = router;