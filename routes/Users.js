const express=require("express")
const users=express.Router()
const cors=require("cors")
const jwt=require("jsonwebtoken")
const bcryptjs=require("bcryptjs")

const Users = require("../models/User")


users.use(cors())

process.env.SECRET_KEY='secret'

users.post('/register',(req,res)=>{
    const today=new Date()
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        created:today
    }

    Users.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            bcryptjs.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash
                User.create(userData)
                .then(user=>{
                    res.json({status:user.email  +  'Registered'})
                })
                .catch(err=>{
                    res.send('error:' +err)
                })
            })
        }else{
            res.json({error: 'User alresdy exits'})
        }
    })
    .catch(err=>{
        res.send('error: '+err)
    })
})


users.post('/login',(req,res)=>{
    Users.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(user){
            if(bcryptjs.compareSync(req.body.password,user.password)){
                const payload={
                    _id:user._id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.json({token : token})
            }
            else{
                res.json({error:"User doesnot exit"})
            }
        }
        else{
            res.json({error: "User does not exist"})
        }
    })
    .catch(err=>{
        res.send('error: ' + err)
    })
})


users.get('/profile',(req,res)=>{
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

    Users.findOne({
        _id:decoded._id
    })
    .then(user=>{
        if(user){
            res.json(user)
        }
        else{
            res.send("User does not exits")
        }
    })
    .catch(err=>{
        res.send('error: ' + err)
    })
})


users.get("/get_all",(req,res)=>{
    Users.find()
    .then((data)=>{
        res.json(data);
    })
})

module.exports=users
