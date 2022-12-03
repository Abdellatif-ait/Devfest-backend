const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

async function handleGetAll(req,res){
    try {
        const users= await prisma.user.findMany()
        res.status(200).json({status:200,message:"here's all your users",data:users})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong",e:error.message})
    }
}
async function handleGetSingle(req,res){
    try {
        const id= req.params.id
        const user= await prisma.user.findFirst({where:{id}})
        res.status(200).json({status:200,message:"here's your user",data:user})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleLogin(req,res){
    try {
        const {email,password}=req.body
        await prisma.user.findFirst({where:{
            email
        }}).then((user)=>{
            bcrypt.compare(password,user.password).then(passwordCheck=>{
                if(!passwordCheck){return res.status(400).json({status:400,message:"Email/password wrong"})} 
                const token=jwt.sign({
                    userId:user.id,
                    username:user.username,
                    access:user.AccessKey
                },
                process.env.JWT_Token,
                {expiresIn:"12h"}
                );
                res.status(200).json({status:200,message:"welcome again sir",data:token})
            }).catch((e)=>{
                res.status(400).json({status:400,message:"Email/password wrong"})
            })
        }).catch((e)=>{
            res.status(404).json({status:404,message:'user not found'})
        })
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleRegister(req,res){
    try {
        const {email,password,username}=req.body
        bcrypt.hash(password,10).then(hashedPassword=>{
            prisma.user.create({data:{
                email,username,password:hashedPassword
            }}).then(user=>{
                res.status(201).json({status:201,message:"user created",data:user})
            })
        })
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleDelete(req,res){
    try {
        const id= req.params.id
        const user= await prisma.user.delete({where:{
            id
        }})
        res.status(200).json({status:200,message:"user deleted",data:user})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}
async function handleUpdate(req,res){
    try {
        const id= req.params.id
        const {AccessKey,email,password,username}=req.body
        const user= await prisma.user.update({where:{
            id
        },data:{
            AccessKey,email,password,username
        }})
        res.status(200).json({status:200,message:"user updated",data:user})
    } catch (error) {
        res.status(500).json({status:500,message:"something went wrong"})
    }
}

module.exports={handleGetAll,handleGetSingle,handleLogin,handleRegister,handleDelete,handleUpdate}